# Product Management System — Frontend

## Tech Stack

- **Framework:** Expo SDK 56 (managed workflow)
- **Language:** TypeScript 6.0 (strict)
- **UI:** React Native 0.85 + React 19.2.3
- **Routing:** expo-router v4 (file-based routing)
- **State:** React hooks (useState, useEffect, useCallback) — no external state library
- **Networking:** Custom `fetch`-based HTTP client with retry (3 attempts, exponential backoff)
- **Storage:** AsyncStorage (tokens, user data)
- **Animations:** react-native-reanimated v4.3.1
- **Platforms:** Android, iOS, Web (via react-native-web)

## Project Structure

```
src/
├── api/            HTTP client with auth headers, retry, error handling
├── app/            File-based routes (expo-router)
│   ├── _layout.tsx         Root layout (SafeAreaProvider + Stack)
│   ├── index.tsx           Auth redirect (entry point)
│   ├── (auth)/             Unauthenticated screens (login, register)
│   └── (app)/              Authenticated screens (product list)
├── components/     Reusable UI components (ThemedButton, ThemedInput, ProductCard, etc.)
├── config/         Environment config (API URL)
├── constants/      Design tokens (dark theme: colors, typography, spacing)
├── hooks/          Custom hooks (useAuth, useProducts, useTheme)
├── types/          TypeScript interfaces (User, Product, AuthResponse)
└── utils/          Storage utilities (token/user persistence)
```

## Architecture

- **Auth flow:** App checks AsyncStorage for token on launch → redirects to `(auth)` or `(app)`. Admin users are blocked from the mobile client.
- **API client:** Auto-attaches Bearer token, handles 401 auto-logout, retries on network errors with delay.
- **Theme:** Dark color palette throughout (deep navy + indigo accent). ThemedText/ThemedView components consume tokens from a single theme constant.
- **Routing:** Three route groups — root layout (SafeAreaProvider), auth group (login/register), app group (guarded by auth check).

## Features

- **Registration:** Name/email/password/confirm form with client-side validation (email format, password strength, match).
- **Login:** Email/password → receives token + user → stores in AsyncStorage → navigates to app.
- **Product list:** Greeting (time-based), search/filter, pull-to-refresh, loading/empty/error states, product cards (emoji, name, price, description).
- **Explore screen:** Static help screen with Expo docs, collapsible sections.
- **Logout:** Clears storage, redirects to login.

## API Endpoints Consumed

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/register` | Register new client |
| POST | `/api/login` | Login, receive token |
| POST | `/api/logout` | Invalidate token |
| GET | `/api/products` | List all products |

## Key Config

- **API URL:** `EXPO_PUBLIC_API_URL` env var (defaults: `192.168.100.198:8000/api` dev, `10.0.2.2:8000/api` Android emulator, `localhost:8000/api` iOS/web)
- **Build:** EAS Build (3 profiles: dev, preview, production)
- **Package:** `com.ismabeast.frontend` (Android), `com.ismabeast.frontend` (iOS)
