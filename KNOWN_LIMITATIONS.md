# Known Limitations & Technical Debt

This document outlines known limitations, constraints, and items that need attention before production deployment.

## Authentication & Security

### MVP Auth Implementation
- **Current:** Email/password stored locally in AsyncStorage
- **Issue:** Passwords not hashed, stored in plain text on device
- **Fix:** Integrate Supabase, Firebase, Auth0, or custom backend auth before production
- **Impact:** ⚠️ HIGH — Security risk for production

### Password Reset
- **Current:** Not fully implemented; only checks email existence
- **Issue:** No email provider configured for password reset links
- **Fix:** Add email service (SendGrid, Mailgun, Firebase) and complete password reset flow
- **Impact:** ⚠️ MEDIUM — Users cannot recover forgotten passwords

### Session Management
- **Current:** Tokens generated locally, not validated server-side
- **Issue:** No token refresh, expiration, or revocation
- **Fix:** Implement proper JWT or session token validation on backend
- **Impact:** ⚠️ MEDIUM — User sessions can be spoofed

### Apple Sign-In
- **Current:** Implemented but requires production entitlements
- **Issue:** Test-only; requires App ID with Sign in with Apple capability
- **Fix:** Configure in Apple Developer account and Expo before submission
- **Impact:** ⚠️ LOW — Works in development, needs prod config

---

## Data Storage & Backend

### Local-Only Data
- **Current:** Most user data stored in device AsyncStorage and SQLite
- **Issue:** No cloud sync, backup, or recovery mechanism
- **Fix:** Integrate SurrealDB, Firebase, or Supabase for backend sync
- **Impact:** ⚠️ MEDIUM — User data not backed up; lost if app uninstalled

### SurrealDB Integration
- **Current:** Optional backend integration, partially implemented
- **Issue:** Requires manual environment variable setup; not tested at scale
- **Fix:** Test backend sync thoroughly; add offline-first sync strategy
- **Impact:** ⚠️ MEDIUM — Only affects apps using remote backend

### Database Migrations
- **Current:** No migration system for schema changes
- **Issue:** Hard to update local database structure after release
- **Fix:** Implement migration framework (better-sqlite, expo-sqlite migrations)
- **Impact:** ⚠️ LOW — Problem only if schema needs to change

---

## In-App Purchases & Subscriptions

### RevenueCat Configuration
- **Current:** Uses test API key hardcoded as fallback
- **Issue:** Test key must be replaced with production key before app store submission
- **Fix:** Set `EXPO_PUBLIC_REVENUECAT_API_KEY` environment variable with production key
- **Impact:** ⚠️ HIGH — App will use test purchases in production without this

### Payment Processing
- **Current:** Transactions go through RevenueCat but not validated server-side
- **Issue:** No backend verification; client-side trust only
- **Fix:** Add server-side purchase receipt verification
- **Impact:** ⚠️ MEDIUM — Theoretical risk of purchase fraud

### Refund Handling
- **Current:** No automatic refund handling in app
- **Issue:** Refunds must be processed manually in RevenueCat dashboard
- **Fix:** Implement automatic entitlement revocation on refund
- **Impact:** ⚠️ LOW — Users can keep access if refund processed externally

### Subscription Status
- **Current:** Status checked locally; no server sync
- **Issue:** User could spoof premium status by manipulating local storage
- **Fix:** Sync subscription status with backend on critical operations
- **Impact:** ⚠️ MEDIUM — Potential for subscription bypass

---

## Type Safety & Linting

### Unresolved Imports
- **Files:**
  - `app/calorie/scan.tsx` — Missing `@rork-ai/toolkit-sdk`
  - `app/fitness/add.tsx` — Missing `@rork-ai/toolkit-sdk`
- **Issue:** Optional dependency for image scanning; not in package.json
- **Fix:** Either install the package or remove references
- **Impact:** ⚠️ LOW — Code works; just linting warnings

### Unused Variables
- **Various files** — Unused imports and variables (documented in lint output)
- **Issue:** Code bloat; minor maintenance burden
- **Fix:** Run `npm run lint` and address warnings manually
- **Impact:** ⚠️ LOW — Does not affect functionality

### Missing Dependency Types
- **Current:** `@types/bcryptjs` deprecated (bcryptjs provides types)
- **Issue:** Redundant types in devDependencies
- **Fix:** Remove deprecated types package
- **Impact:** ⚠️ LOW — Build still works

---

## UI/UX & Functionality

### Large Screen Components
- **Files with 1000+ lines:**
  - `app/index.tsx` (1204 lines)
  - `app/settings.tsx` (2314 lines)
  - `app/appointments/index.tsx` (1040 lines)
  - `app/calorie/scan.tsx` (2118 lines)
  - `app/financial/index.tsx` (1439 lines)
- **Issue:** Maintenance difficulty; hard to test, refactor, or debug
- **Fix:** Split components into smaller, focused files
- **Impact:** ⚠️ MEDIUM — Development friction for future changes

### Image Scanning
- **Current:** Calorie/nutrition image scanning UI present
- **Issue:** Requires `@rork-ai/toolkit-sdk` (not installed)
- **Fix:** Install package or disable feature
- **Impact:** ⚠️ MEDIUM — Feature cannot be used without SDK

### Animations & Performance
- **Current:** Multiple Animated.Value and useAnimatedStyle hooks
- **Issue:** Not profiled for performance; may drop frames on low-end devices
- **Fix:** Profile on target devices; optimize with React.memo, useMemo
- **Impact:** ⚠️ LOW — Works on modern devices

### Accessibility
- **Current:** No formal accessibility audit (A11y)
- **Issue:** May not meet WCAG 2.1 AA standards
- **Fix:** Run axe accessibility checks; add aria labels
- **Impact:** ⚠️ MEDIUM — May not be compliant for regulated use

---

## API & Backend Integration

### API Error Handling
- **Current:** Basic try/catch blocks; limited retry logic
- **Issue:** Network failures may not be handled gracefully
- **Fix:** Add exponential backoff, retry limits, offline detection
- **Impact:** ⚠️ LOW — User-facing errors are handled; UX could be better

### Rate Limiting
- **Current:** No rate limiting on API calls
- **Issue:** Rapid calls could hit external service limits (RevenueCat, SurrealDB)
- **Fix:** Add request throttling and debouncing
- **Impact:** ⚠️ LOW — Not a problem for typical user

### API Authentication
- **Current:** No API key validation in backend; relies on user ID
- **Issue:** Backend vulnerable to unauthorized requests
- **Fix:** Implement proper API authentication (Bearer tokens, API keys)
- **Impact:** ⚠️ HIGH — Production backend needs this

---

## Testing & Quality Assurance

### Automated Tests
- **Current:** No unit or integration tests
- **Issue:** Changes can break existing features without detection
- **Fix:** Add Jest/React Native Testing Library tests
- **Impact:** ⚠️ HIGH — No safety net for refactoring

### E2E Testing
- **Current:** No end-to-end tests
- **Issue:** UI flows not validated automatically
- **Fix:** Add Detox or Playwright tests
- **Impact:** ⚠️ MEDIUM — Manual testing required for each release

### Crash Reporting
- **Current:** Console.error logs; no crash reporting service
- **Issue:** Production crashes not tracked or alerted
- **Fix:** Integrate Sentry, Bugsnag, or Firebase Crashlytics
- **Impact:** ⚠️ MEDIUM — Production issues detected slowly

---

## Deployment & Distribution

### Bundle Size
- **Current:** Not measured; likely large due to many dependencies
- **Issue:** Larger app = slower download, more storage
- **Fix:** Analyze with `npx expo bundle-analyzer`; remove unused deps
- **Impact:** ⚠️ LOW — App still downloads quickly on modern networks

### Cold Start Performance
- **Current:** Not profiled
- **Issue:** App may take time to initialize on slow devices
- **Fix:** Profile startup; lazy-load features; optimize context initialization
- **Impact:** ⚠️ LOW — Works on test devices

### Web Build
- **Current:** Builds but not fully tested for production
- **Issue:** Web version may have layout/styling issues
- **Fix:** Test on multiple browsers; add responsive design fixes
- **Impact:** ⚠️ LOW — Web version treated as optional

### App Store Requirements
- **Current:** App not submitted; configuration incomplete
- **Issue:** App names, icons, privacy URLs not set to final values
- **Fix:** Update app.json with production metadata before submission
- **Impact:** ⚠️ HIGH — Blocking app store submission

---

## Security Considerations

### Secrets & Credentials
- **Current:** RevenueCat test key in code; environment variables for production keys
- **Issue:** Potential for accidental commits of real API keys
- **Fix:** Use `.gitignore` for `.env` files; audit commit history
- **Impact:** ⚠️ MEDIUM — Test-only risk; production should use env vars

### Certificate Pinning
- **Current:** Not implemented
- **Issue:** Man-in-the-middle attacks possible on HTTPS
- **Fix:** Implement certificate pinning for critical APIs
- **Impact:** ⚠️ MEDIUM — Lower priority for MVP

### Code Signing
- **Current:** Development certificates only
- **Issue:** Production builds need proper code signing before store submission
- **Fix:** Set up iOS certificates and Android keystore
- **Impact:** ⚠️ HIGH — Required for distribution

### Sensitive Data Exposure
- **Current:** Passwords stored plain text; tokens in memory
- **Issue:** Device compromise could leak credentials
- **Fix:** Use expo-secure-store for all sensitive data
- **Impact:** ⚠️ HIGH — Production security requirement

---

## Documentation Gaps

### API Documentation
- **Current:** Limited; backend API (tRPC) not documented
- **Issue:** New developers hard to onboard
- **Fix:** Generate API docs from tRPC schema
- **Impact:** ⚠️ LOW — Internal project only

### Architecture Diagrams
- **Current:** Text-based architecture docs
- **Issue:** Complex data flows hard to visualize
- **Fix:** Add Mermaid diagrams for architecture, data flow
- **Impact:** ⚠️ LOW — Can be added later

### Troubleshooting Guide
- **Current:** Not included
- **Issue:** Common issues not documented
- **Fix:** Add FAQ/troubleshooting to docs
- **Impact:** ⚠️ LOW — Support-focused

---

## Dependency & Maintenance

### Outdated Packages
- **Current:** Some packages have newer versions
- **Issue:** Security patches and bug fixes may be available
- **Fix:** Run `npm audit fix` (carefully); update dependencies
- **Impact:** ⚠️ LOW — Current versions are stable

### Deprecation Warnings
- **Current:** Several deprecated packages in dependency tree
- **Affected:** rimraf 3.x, uuid 7.x, glob 7.x
- **Fix:** Update affected packages to current versions
- **Impact:** ⚠️ LOW — Works now; upgrade needed for future Node

### Breaking Changes
- **Current:** React 19, React Native 0.81 — cutting edge
- **Issue:** Limited production track record; potential stability issues
- **Fix:** Monitor ecosystem; revert if issues arise
- **Impact:** ⚠️ MEDIUM — Early adopter risk

---

## Recap: What Needs Attention Before Production

| Priority | Item | Action |
|----------|------|--------|
| 🔴 HIGH | Replace local auth with real provider | Integrate Supabase/Firebase/Auth0 |
| 🔴 HIGH | RevenueCat production API key | Update environment variable before submission |
| 🔴 HIGH | App store metadata & bundle IDs | Update app.json |
| 🔴 HIGH | Code signing certificates | Set up for iOS/Android |
| 🟠 MEDIUM | Backend data sync | Test SurrealDB or pick alternative |
| 🟠 MEDIUM | Password reset | Implement email provider & flow |
| 🟠 MEDIUM | Large component refactoring | Split 1000+ line files |
| 🟠 MEDIUM | Crash reporting | Add Sentry or Firebase Crashlytics |
| 🟡 LOW | Unit/integration tests | Add test coverage |
| 🟡 LOW | Unresolved imports | Install or remove `@rork-ai/toolkit-sdk` |

---

## For Future Development

- Add automated testing framework
- Implement feature flags for gradual rollouts
- Set up analytics and observability
- Plan architecture for scaling (multi-instance backend, CDN, etc.)
- Consider component library for UI consistency
- Add dark mode improvements (currently auto-detected)
- Implement offline-first architecture for resilience

---

**This document is accurate as of July 8, 2026.**  
**Review and update before each major release.**
