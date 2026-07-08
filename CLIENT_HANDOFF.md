# Client Handoff — Alchemize

## Project Status

**Delivery:** Final MVP / Release Candidate  
**Date:** July 8, 2026  
**Deliverable:** Working React Native Expo app ready for testing, iteration, and deployment

## What Is Included

✅ **Fully functional mobile app** with core features:
- Authentication system (local MVP implementation)
- Habit tracking with streak counters
- Fitness and workout logging
- Nutrition tracking with image scanning capability
- Financial management and budgeting
- Gratitude journaling
- Appointment management
- User settings and preferences
- In-app purchase integration (RevenueCat)

✅ **Complete source code** with:
- TypeScript type safety
- React Native + Expo Router for navigation
- Context API for state management
- Responsive design for iOS, Android, and web
- Comprehensive error handling and logging

✅ **Development environment**:
- All dependencies specified and locked in `package-lock.json`
- Build scripts for iOS and Android via EAS
- Development server for local testing
- Type checking, linting, and validation scripts

✅ **Documentation**:
- Architecture overview and technical decisions
- API and service integration guides
- Setup and deployment instructions
- Known limitations and future work items

## What Is NOT Included

The following are **separate services** and not part of this handoff:

❌ **Production deployment** to App Store or Google Play
❌ **Legal review** of app content, privacy policy, terms of service  
❌ **Security hardening** or penetration testing  
❌ **Backend infrastructure** (server setup, database provisioning)  
❌ **Real authentication provider** integration (Supabase, Firebase, Auth0, etc.)  
❌ **Production payment account setup** (RevenueCat configuration)  
❌ **Ongoing support or maintenance**  
❌ **New features or major revisions** beyond bug fixes  
❌ **Marketing, branding, or design changes**  

---

## How to Run Locally

### First Time Setup

```bash
# Clone or extract the repository
cd Alchemiz-hard-2026/expo

# Install dependencies
npm install --legacy-peer-deps

# Copy environment template
cp .env.example .env

# Start development server
npm start
```

### Running on Device/Emulator

**iOS Simulator:**
```bash
npm start
# Press 'i' in terminal
```

**Android Emulator:**
```bash
npm start
# Press 'a' in terminal
```

**Web Browser:**
```bash
npm run start-web
```

### Testing Features

1. **Sign up** with email/password (stored locally on device)
2. **Navigate** to each tab to test features
3. **Try premium features** — subscription is gated but can be purchased
4. **Check logs** — open browser dev tools (web) or Flipper (mobile) for debugging

---

## Validation Checklist

Before accepting this handoff, run:

```bash
cd expo
npm install --legacy-peer-deps
npm run typecheck
npm run lint
npm run validate:final
npm run ci:local
npm audit --audit-level=moderate
```

**Expected Results:**
- ✅ No TypeScript errors
- ✅ Lint warnings only (documented in KNOWN_LIMITATIONS.md)
- ✅ All validation scripts pass
- ✅ No high/critical security vulnerabilities

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```bash
# .env file in /expo folder

# RevenueCat API Key (required for in-app purchases)
EXPO_PUBLIC_REVENUECAT_API_KEY=your_key_here

# SurrealDB backend (optional, only if using remote database)
EXPO_PUBLIC_RORK_DB_ENDPOINT=
EXPO_PUBLIC_RORK_DB_NAMESPACE=
EXPO_PUBLIC_RORK_DB_TOKEN=
```

If variables are not set:
- **RevenueCat:** Falls back to test key (development only)
- **SurrealDB:** App requires these if backend integration is enabled; throws error if missing

---

## Expo & EAS Configuration

### Current Configuration

- **Expo Owner:** `internetkartel` (in app.json)
- **EAS Project ID:** `8482b587-bf4b-4f73-96da-e7ff086683a3`
- **Bundle IDs:**
  - iOS: `com.frce.alchemize`
  - Android: `com.frce.alchemize`

### Before App Store Submission

You **must** update the following in `/expo/app.json`:

1. **App Name & Branding:**
   - `expo.name` — Display name
   - `expo.slug` — URL-safe identifier
   - `expo.scheme` — Deep link prefix

2. **Ownership & Identifiers:**
   - `expo.owner` — Your Expo account
   - `expo.ios.bundleIdentifier` — Your iOS bundle ID (format: com.yourdomain.appname)
   - `expo.android.package` — Your Android package name

3. **Legal URLs:**
   - `expo.extra.legalUrls.privacy` — URL to your privacy policy
   - `expo.extra.legalUrls.termsOfService` — URL to your terms

4. **Assets (optional):**
   - App icon: `/expo/assets/images/icon.png`
   - Splash screen: `/expo/assets/images/splash-icon.png`

5. **EAS Project:**
   - Link your Expo account and update `expo.extra.eas.projectId`

### Building for Distribution

```bash
# iOS
eas build --platform ios --auto-submit

# Android  
eas build --platform android --auto-submit

# Both platforms
eas build --platform all
```

Builds are queued on Expo's servers. Signed APKs/IPA files are returned for submission to stores.

---

## RevenueCat Setup

### Current State
The app uses RevenueCat's **test API key** for development. Purchases will not charge in test environment.

### Production Setup

1. **Create RevenueCat account:**
   - Go to https://app.revenuecat.com/
   - Sign up and create a new app

2. **Configure offerings in RevenueCat:**
   - Define subscription products (monthly, yearly, lifetime)
   - Set prices and trials
   - Enable entitlements (e.g., "pro")

3. **Get production API key:**
   - Copy your SDK key from RevenueCat dashboard
   - Add to `.env`: `EXPO_PUBLIC_REVENUECAT_API_KEY=your_sdk_key`

4. **Link to app stores:**
   - Connect RevenueCat to App Store Connect and Google Play Console
   - RevenueCat will validate purchases with stores

See `/expo/docs/SUBSCRIPTION-SETUP.md` for detailed instructions.

---

## Backend & Database

### Current Implementation
The app is **self-contained** and does not require a backend for MVP features:
- Authentication uses local device storage
- Data is stored locally
- Optional SurrealDB integration for remote sync (not configured)

### If Using Backend (SurrealDB)

1. Provision SurrealDB instance
2. Create database and configure authentication token
3. Set environment variables:
   - `EXPO_PUBLIC_RORK_DB_ENDPOINT`
   - `EXPO_PUBLIC_RORK_DB_NAMESPACE`
   - `EXPO_PUBLIC_RORK_DB_TOKEN`
4. Backend sync code is present but requires testing and hardening

### For Production
Consider migrating to:
- Firebase Firestore / Realtime Database
- Supabase PostgreSQL
- Custom Node.js backend
- AWS AppSync

---

## Known Issues & Limitations

See [KNOWN_LIMITATIONS.md](./KNOWN_LIMITATIONS.md) for complete list.

**Key Items:**
- Auth is MVP/local (not production-grade)
- Password reset is not fully implemented (requires email provider)
- Some ESLint warnings (unresolved imports) are documented
- Subscription system requires RevenueCat configuration
- Backend optional; not all features require it

---

## File Structure Overview

```
Alchemiz-hard-2026/
├── README.md                    ← Start here
├── CLIENT_HANDOFF.md            ← This file
├── KNOWN_LIMITATIONS.md         ← What's not ready for production
├── expo/
│   ├── app/                     ← All screens/routes
│   ├── components/              ← Reusable UI components
│   ├── contexts/                ← Auth, Subscription state
│   ├── lib/                     ← Utilities (purchases, db, etc.)
│   ├── backend/                 ← Backend API (Hono/tRPC)
│   ├── docs/                    ← Technical documentation
│   ├── app.json                 ← Expo configuration (update before submission)
│   ├── package.json             ← Dependencies
│   ├── .env.example             ← Environment variables template
│   └── tsconfig.json            ← TypeScript config
├── android/                     ← Android native assets
└── assets/                      ← Shared images
```

---

## Next Steps (Project Owner)

### Immediate (Before Testing)
1. Run validation scripts (see above)
2. Confirm app runs on target devices
3. Review and update configurations in app.json
4. Set up RevenueCat account and API key
5. Test in-app purchases with test credentials

### Pre-Launch
1. Set up real auth provider (Supabase, Firebase, etc.)
2. Configure backend database if needed
3. Update legal URLs and privacy policy
4. Prepare app store listings and assets
5. Security review of auth, payments, and data handling
6. Testing on real devices and store submission

### Production Release
1. Update bundle IDs and app names
2. Upload to App Store Connect and Google Play Console
3. Submit for review
4. Monitor crash reports and user feedback
5. Plan ongoing maintenance and feature work

---

## Support Resources

### Documentation
- `expo/docs/SUBSCRIPTION-SETUP.md` — RevenueCat setup
- `expo/docs/ARCHITECTURE-BASELINE.md` — Technical architecture
- `expo/docs/deployment/DEPLOYMENT_READINESS.md` — Deployment guide

### External
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [RevenueCat Docs](https://docs.revenuecat.com/)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)

---

## Important Notes

- **This is an MVP.** Code is functional and well-structured, but may need hardening for production.
- **Local authentication is not production-grade.** Replace with a proper auth provider before public release.
- **Passwords are stored in plain text locally.** Use secure storage provider (Supabase, Firebase) in production.
- **RevenueCat test key is hardcoded.** Must be replaced with production key before app store submission.
- **Future work is separate.** New features, revisions, and ongoing support are billable services.

---

## Delivery Confirmation

✅ All source code delivered and functional  
✅ TypeScript types validated  
✅ Dependencies resolved and locked  
✅ Documentation complete  
✅ Validation scripts working  
✅ Ready for client testing and iteration

**This project is delivered as an MVP/release-candidate handoff. Additional production hardening, app store submission, payment account setup, backend migration, new features, and ongoing support are separate services unless separately agreed in writing.**

---

**Questions?** Review KNOWN_LIMITATIONS.md and /expo/docs/, then contact your development team.
