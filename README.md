# Alchemize

[![Stability Check](https://github.com/onlytrafficfans-gif/alchemize-final-handoff/actions/workflows/stability-check.yml/badge.svg)](https://github.com/onlytrafficfans-gif/alchemize-final-handoff/actions/workflows/stability-check.yml)

**Status:** Final MVP / Release Candidate Handoff — verified passing on a clean machine at delivery; see [HANDOFF_VERIFICATION.md](./HANDOFF_VERIFICATION.md)

A React Native app built with Expo for personal wellness management, including habit tracking, fitness, nutrition, finances, and more.

## Quick Start

The main app is located in the `/expo` folder.

### Prerequisites
- Node.js 18+ (tested with Node 20)
- npm 9+

### Installation & Run

```bash
cd expo
npm install --legacy-peer-deps
npm start
```

For web:
```bash
npm run start-web
```

For development web with debug logs:
```bash
npm run start-web-dev
```

## Validation & Quality

Run these commands to validate the project before use:

```bash
npm run typecheck      # TypeScript type checking
npm run lint           # ESLint validation
npm run validate:final # Full handoff validation
npm run ci:local       # Complete CI simulation (validation + lint + expo-doctor)
npm audit --audit-level=moderate  # Security audit
```

### Expected Results
- **typecheck**: Should complete with no errors
- **lint**: May have warnings; errors only for unresolved imports (documented in KNOWN_LIMITATIONS)
- **validate:final**: All validation checks should pass
- **ci:local**: Should complete successfully

## Key Features

- Authentication (MVP: local email/password)
- Habit tracking with streaks
- Fitness & workout logging
- Nutrition & calorie tracking with image scanning
- Financial management & budgeting
- Gratitude journal
- Appointments & calendar
- Settings & subscription management
- RevenueCat integration for in-app purchases

## Documentation

- **[CLIENT_HANDOFF.md](./CLIENT_HANDOFF.md)** — What's included, what's not, and next steps
- **[HANDOFF_VERIFICATION.md](./HANDOFF_VERIFICATION.md)** — Verified delivery state, CI results, and how to reproduce them
- **[KNOWN_LIMITATIONS.md](./KNOWN_LIMITATIONS.md)** — Known issues and documented constraints
- **[/expo/.env.example](./expo/.env.example)** — Required environment variables
- **[/expo/docs/](./expo/docs/)** — Detailed technical documentation

## Environment Configuration

Copy `/expo/.env.example` to `/expo/.env` and fill in the required values:

```bash
cp expo/.env.example expo/.env
```

### Required Variables
- `EXPO_PUBLIC_REVENUECAT_API_KEY` — RevenueCat SDK key for in-app purchases
- `EXPO_PUBLIC_RORK_DB_ENDPOINT`, `EXPO_PUBLIC_RORK_DB_NAMESPACE`, `EXPO_PUBLIC_RORK_DB_TOKEN` — SurrealDB backend (if used)

## Building for Distribution

### iOS
```bash
cd expo
eas build --platform ios
```

### Android
```bash
cd expo
eas build --platform android
```

**Note:** App Store and Google Play submission requires:
- Updating app name, bundle identifiers, and icons in `/expo/app.json`
- Setting up RevenueCat account with production API key
- Verifying legal URLs and privacy policies
- Configuring code signing certificates

See [CLIENT_HANDOFF.md](./CLIENT_HANDOFF.md) for details.

## Project Structure

```
/expo
├── app/              — Expo Router screens and pages
├── components/       — Reusable React components
├── contexts/         — Auth, Subscription context providers
├── lib/              — Utility functions and helpers
├── types/            — TypeScript types and interfaces
├── backend/          — Backend server code (Hono + tRPC)
├── assets/           — Images, fonts, splash screen
├── docs/             — Technical documentation
├── scripts/          — Validation and build scripts
├── app.json          — Expo configuration
├── tsconfig.json     — TypeScript configuration
└── package.json      — Dependencies and scripts
```

## Authentication

**Current Implementation:** MVP local email/password auth stored in device AsyncStorage.

For production use, integrate a real auth provider:
- Supabase Auth
- Firebase Authentication
- Custom backend auth
- Auth0

See `/expo/contexts/auth-context.tsx` for current implementation.

## Payments

In-app purchases are managed through RevenueCat. The app currently uses a test/demo API key.

**For production:**
1. Create a RevenueCat account at https://app.revenuecat.com/
2. Configure your app and subscription offerings in RevenueCat dashboard
3. Set `EXPO_PUBLIC_REVENUECAT_API_KEY` to your production API key

See `/expo/docs/SUBSCRIPTION-SETUP.md` for detailed setup instructions.

## Support & Issues

This is a handoff deliverable. For issues or questions:
1. Check [KNOWN_LIMITATIONS.md](./KNOWN_LIMITATIONS.md)
2. Review documentation in `/expo/docs/`
3. Consult the validation scripts for diagnostic info

## License

Proprietary — see app ownership in `/expo/app.json`

---

**Last Updated:** 2026-07-08  
**Prepared for:** MVP / Release Candidate Handoff
