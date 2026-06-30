# Product Management System — AI Agent Context

> **Single source of truth** for AI agents evolving this project. Read this first before making any changes.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Directory Structure](#4-directory-structure)
5. [API Contract](#5-api-contract)
6. [Authentication & Authorization Flow](#6-authentication--authorization-flow)
7. [Component Tree & Data Flow](#7-component-tree--data-flow)
8. [Database Schema](#8-database-schema)
9. [User Stories](#9-user-stories)
10. [Testing Patterns](#10-testing-patterns)
11. [Environment & Configuration](#11-environment--configuration)
12. [Coding Standards & Best Practices](#12-coding-standards--best-practices)
13. [Update & File Addition Guidelines](#13-update--file-addition-guidelines)
14. [Security Constraints](#14-security-constraints)
15. [Known Design Decisions & Trade-offs](#15-known-design-decisions--trade-offs)

---

## 1. Project Overview

A **two-tier product management system** with a mobile-first React Native (Expo) frontend and a Laravel RESTful JSON API backend. Clients browse products; admins manage products and users via a **future web portal** (the mobile app explicitly blocks admin login).

### Current State (v1.0)

| Feature | Status |
|---------|--------|
| User Registration | ✅ Complete |
| User Login (Client only on mobile) | ✅ Complete |
| User Logout (token revocation) | ✅ Complete |
| List Products (all authenticated users) | ✅ Complete |
| Create Product (admin only) | ✅ Complete |
| Update Product (admin only) | ✅ Complete |
| Delete Product (admin only) | ✅ Complete |
| List Users (admin only) | ✅ Complete |
| Admin Web Portal | ⬜ Not built yet |
| Product Search/Filter | ⬜ Not built yet |
| Pagination | ⬜ Not built yet |
| Image Upload | ⬜ Not built yet |

---

## 2. System Architecture

```
┌──────────────────────────────────┐     ┌──────────────────────────────────┐
│         FRONTEND (Expo)          │     │         BACKEND (Laravel)        │
│                                  │     │                                  │
│  ┌────────────────────────────┐  │     │  ┌────────────────────────────┐  │
│  │   Expo Router (file-based)  │  │     │  │     Laravel Routes         │  │
│  │   - Auth Stack             │  │     │  │     api.php                │  │
│  │   - App Stack              │  │     │  └──────────┬─────────────────┘  │
│  └────────────┬───────────────┘  │     │             │                    │
│               │                   │     │             ▼                    │
│  ┌────────────▼───────────────┐  │     │  ┌────────────────────────────┐  │
│  │    Axios Client             │  │     │  │   Controllers              │  │
│  │    (automatic Bearer token  │  │ HTTP │  │   - AuthController        │  │
│  │     via request interceptor)│──┼──────┼──┤   - ProductController     │  │
│  └────────────────────────────┘  │     │  │   - UserController         │  │
│                                  │     │  └──────────┬─────────────────┘  │
│  ┌────────────────────────────┐  │     │             │                    │
│  │    AsyncStorage             │  │     │             ▼                    │
│  │    (token + user cache)     │  │     │  ┌────────────────────────────┐  │
│  └────────────────────────────┘  │     │  │   Form Requests            │  │
│                                  │     │  │   (Validation Logic)        │  │
│                                  │     │  ├────────────────────────────┤  │
│                                  │     │  │   API Resources             │  │
│                                  │     │  │   (JSON response shaping)   │  │
│                                  │     │  ├────────────────────────────┤  │
│                                  │     │  │   Middleware                │  │
│                                  │     │  │   - auth:sanctum            │  │
│                                  │     │  │   - isAdmin                 │  │
│                                  │     │  └──────────┬─────────────────┘  │
│                                  │     │             │                    │
│                                  │     │             ▼                    │
│                                  │     │  ┌────────────────────────────┐  │
│                                  │     │  │   Models                   │  │
│                                  │     │  │   - User (Sanctum tokens)  │  │
│                                  │     │  │   - Product                │  │
│                                  │     │  ├────────────────────────────┤  │
│                                  │     │  │   MySQL Database           │  │
│                                  │     │  └────────────────────────────┘  │
└──────────────────────────────────┘     └──────────────────────────────────┘
```

### Rule of thumb: One Token, Two Tiers
- The **Sanctum token** is the exclusive auth handshake. Frontend stores it; backend validates it.
- The **role** (`admin`/`client`) gates what each user can do.

---

## 3. Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Expo SDK | ~56.0.12 | Cross-platform framework (Android, iOS, Web) |
| React Native | 0.85.3 | Mobile UI runtime |
| React | 19.2.3 | UI library |
| expo-router | ~56.2.11 | File-based navigation |
| axios | ^1.18.1 | HTTP client with interceptors |
| @react-native-async-storage/async-storage | 2.2.0 | Local token/user persistence |
| react-native-reanimated | 4.3.1 | Animations |
| react-native-gesture-handler | ~2.24.0 | Gesture handling |
| react-native-safe-area-context | 5.4.0 | Safe area insets |
| react-native-screens | ~4.10.0 | Native screen containers |
| TypeScript | ~6.0.3 | Type safety |
| expo-splash-screen | ~0.29.0 | Splash screen |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| PHP | ^8.3 | Language |
| Laravel Framework | ^13.8 | Web framework |
| Laravel Sanctum | ^4.0 | Token-based API authentication |
| PHPUnit | ^12.5.12 | Testing |
| MySQL | - | Primary database |
| SQLite | - | Test database (`:memory:`) |

---

## 4. Directory Structure

### Frontend (`frontend/`)

```
frontend/
├── app.json                          # Expo configuration
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript config (path alias @/ → src/)
├── AGENTS.md                         # ⚠ Critical: "Read exact Expo v56 docs first"
├── CLAUDE.md                         # References AGENTS.md
│
└── src/
    ├── api/
    │   └── axios.ts                  # Axios instance + Bearer token interceptor
    │
    ├── app/                          # ⭐ Expo Router file-based pages
    │   ├── _layout.tsx               # Root layout (SafeAreaProvider + Stack)
    │   ├── index.tsx                 # Auth guard → redirects to login or app
    │   ├── explore.tsx               # Static info/help screen
    │   │
    │   ├── (auth)/                   # ⚡ Auth group - no header
    │   │   ├── _layout.tsx           # Auth stack layout
    │   │   ├── login.tsx             # Login screen
    │   │   └── register.tsx          # Registration screen
    │   │
    │   └── (app)/                    # 🔒 App group - requires auth
    │       ├── _layout.tsx           # App stack layout
    │       └── index.tsx             # Product list screen (main screen)
    │
    ├── components/
    │   ├── auth/                     # (reserved for future auth components)
    │   ├── ui/
    │   │   └── collapsible.tsx       # Animated collapsible
    │   ├── ProductCard.tsx           # Product card in list
    │   ├── themed-text.tsx           # Theme-aware Text
    │   ├── themed-view.tsx           # Theme-aware View
    │   ├── animated-icon.tsx         # Splash animation (native)
    │   ├── animated-icon.web.tsx     # Splash animation (web)
    │   ├── app-tabs.tsx              # Tab navigator (native)
    │   ├── app-tabs.web.tsx          # Tab navigator (web)
    │   ├── external-link.tsx         # External link wrapper
    │   ├── hint-row.tsx              # Code hint display
    │   └── web-badge.tsx             # Expo version badge
    │
    ├── constants/
    │   └── theme.ts                  # Colors, Fonts, Spacing constants
    │
    ├── hooks/
    │   ├── use-color-scheme.ts       # Color scheme hook (native re-export)
    │   ├── use-color-scheme.web.ts   # Color scheme hook (web)
    │   └── use-theme.ts              # Returns current theme colors
    │
    ├── types/
    │   └── index.ts                  # TypeScript interfaces (Product)
    │
    ├── utils/
    │   └── storage.ts                # AsyncStorage token/user helpers
    │
    └── global.css                    # CSS custom properties (web)
```

### Backend (`backend/`)

```
backend/
├── composer.json                     # PHP dependencies
├── .env                              # Environment config
├── artisan                           # CLI entry
│
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Controller.php        # Base abstract controller
│   │   │   └── Api/
│   │   │       ├── AuthController.php     # register, login, logout
│   │   │       ├── ProductController.php  # CRUD products
│   │   │       └── UserController.php     # List users (admin)
│   │   │
│   │   ├── Middleware/
│   │   │   └── IsAdmin.php           # Admin-only middleware
│   │   │
│   │   ├── Requests/
│   │   │   ├── RegisterRequest.php   # name, email, password|confirmed|min:8
│   │   │   ├── LoginRequest.php      # email, password|required
│   │   │   ├── StoreProductRequest.php   # name, price, description(nullable)
│   │   │   └── UpdateProductRequest.php  # same but sometimes (partial update)
│   │   │
│   │   └── Resources/
│   │       ├── ProductResource.php    # id, name, description, price(float), created_at
│   │       └── UserResource.php       # id, name, email, role, created_at
│   │
│   └── Models/
│       ├── User.php                  # HasApiTokens, HasFactory, isAdmin()
│       └── Product.php               # HasFactory
│
├── bootstrap/
│   └── app.php                       # Middleware aliases (isAdmin), exception handling
│
├── config/
│   ├── auth.php                      # Auth guards (web, sanctum)
│   ├── sanctum.php                   # Token config
│   └── database.php                  # DB connections
│
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 2026_06_29_142815_create_personal_access_tokens_table.php
│   │   └── 2026_06_29_143735_create_products_table.php
│   ├── factories/
│   │   ├── UserFactory.php
│   │   └── ProductFactory.php
│   ├── seeders/
│   │   ├── DatabaseSeeder.php
│   │   ├── UserSeeder.php            # 1 admin + 2 clients
│   │   └── ProductSeeder.php         # 5 sample products
│   └── database.sqlite               # Stale; actual DB is MySQL
│
├── routes/
│   ├── api.php                       # ⭐ ALL API route definitions
│   ├── web.php                       # Welcome page
│   └── console.php                   # Artisan commands
│
└── tests/
    ├── TestCase.php                  # Base test case
    └── Feature/
        ├── AuthApiTest.php           # Register/login/logout tests
        ├── ProductApiTest.php        # Product CRUD + RBAC tests
        └── UserApiTest.php           # User listing + RBAC tests
```

---

## 5. API Contract

### Base URL

```
http://192.168.100.198:8000/api
```

All endpoints return JSON. Auth endpoints return `token` + `user`. Collection endpoints wrap data in a `data` key.

### Endpoints

| Method | Endpoint | Auth | Role | Request Body | Response | Status Codes |
|--------|----------|------|------|-------------|----------|-------------|
| POST | `/register` | ❌ | Public | `{ name, email, password, password_confirmation }` | `{ token, user: UserResource }` | 201 ✅, 422 ❌ |
| POST | `/login` | ❌ | Public | `{ email, password }` | `{ token, user: UserResource }` | 200 ✅, 422 ❌ |
| POST | `/logout` | ✅ Sanctum | Any | — | `{ message: "Logged out successfully" }` | 200 ✅ |
| GET | `/products` | ✅ Sanctum | Any | — | `{ data: ProductResource[] }` | 200 ✅ |
| POST | `/products` | ✅ Sanctum | Admin | `{ name, price, description? }` | `ProductResource` | 201 ✅, 422 ❌, 403 🔒 |
| PUT | `/products/{id}` | ✅ Sanctum | Admin | `{ name?, price?, description? }` | `ProductResource` | 200 ✅, 422 ❌, 403 🔒, 404 ❓ |
| DELETE | `/products/{id}` | ✅ Sanctum | Admin | — | `{ message: "Product deleted successfully" }` | 200 ✅, 403 🔒 |
| GET | `/users` | ✅ Sanctum | Admin | — | `{ data: UserResource[] }` | 200 ✅, 403 🔒 |

### JSON Response Shapes

**ProductResource:**
```json
{
  "id": 1,
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "price": 25.5,
  "created_at": "2026-06-29T14:37:35.000000Z"
}
```

**UserResource:**
```json
{
  "id": 1,
  "name": "Client One",
  "email": "client1@app.com",
  "role": "client",
  "created_at": "2026-06-29T14:37:35.000000Z"
}
```

**Error responses:**
- **401** (unauthenticated): `{ "message": "Unauthenticated." }`
- **403** (forbidden): `{ "message": "Forbidden. Admin access required." }`
- **422** (validation): `{ "message": "The given data was invalid.", "errors": { "field": ["error msg"] } }`
- **404** (not found): `{ "message": "No query results for model [App\\Models\\Product] 999" }`

### Validation Rules

| Request | Fields |
|---------|--------|
| RegisterRequest | `name` (required, string, max:255), `email` (required, email, unique:users), `password` (required, string, min:8, confirmed) |
| LoginRequest | `email` (required, email), `password` (required, string) |
| StoreProductRequest | `name` (required, string, max:255), `description` (nullable, string), `price` (required, numeric, min:0) |
| UpdateProductRequest | `name` (sometimes, string, max:255), `description` (nullable, string), `price` (sometimes, numeric, min:0) |

---

## 6. Authentication & Authorization Flow

### Token Lifecycle

```
REGISTRATION / LOGIN
   │
   ▼
Backend: createToken('auth_token') → plainTextToken
   │
   ▼
Frontend: save { token, user.role } to AsyncStorage
   │
   ▼
  ┌─── role === 'admin'? ───→ ❌ ALERT + REJECT (mobile only)
  │
  └─── role === 'client'? ──→ ✅ Save token → Redirect to /(app)
```

```
EVERY REQUEST
   │
   ▼
Axios interceptor reads token from AsyncStorage
   │
   ▼
Attaches Header: Authorization: Bearer <token>
   │
   ▼
Backend: auth:sanctum middleware validates token
   │
   ▼
  ┌─── admin-only route? ──→ isAdmin middleware checks $user->isAdmin()
  │
  └─── client route?       ──→ Pass
```

```
LOGOUT
   │
   ▼
Frontend: POST /api/logout → Backend revokes currentAccessToken()
   │
   ▼
Frontend: removeToken() from AsyncStorage
   │
   ▼
Router: dismissAll() → replace('/(auth)/login')
```

### Key Constraint: Admin Block on Mobile

The login screen (`(auth)/login.tsx`) explicitly prevents admin users from accessing the mobile app:

```typescript
if (user.role === 'admin') {
  Alert.alert('Access Denied',
    'Admin access is restricted to the web application only...');
  return; // Token is NOT saved
}
```

This means:
- **Admins can ONLY use the web portal** (not yet built)
- **Clients can ONLY use the mobile app**
- The API itself supports both roles; the restriction is enforced client-side

### Seeded Credentials

| User | Email | Password | Role |
|------|-------|----------|------|
| Admin User | `admin@app.com` | `password` | admin |
| Client One | `client1@app.com` | `password` | client |
| Client Two | `client2@app.com` | `password` | client |

---

## 7. Component Tree & Data Flow

### Screen Hierarchy

```
RootLayout (src/app/_layout.tsx)
  └─ SafeAreaProvider
       └─ Stack (headerShown: false)
            │
            ├─ index.tsx ──── Auth Guard ────┬── token found? → Redirect /(app)
            │                                └── no token?    → Redirect /(auth)/login
            │
            ├─ (auth)/_layout.tsx (Auth Stack)
            │    ├─ login.tsx      ──→ POST /api/login
            │    └─ register.tsx   ──→ POST /api/register
            │
            ├─ (app)/_layout.tsx (App Stack)
            │    └─ index.tsx ──→ GET /api/products → FlatList<ProductCard>
            │
            └─ explore.tsx (static info screen)
```

### Data Flow: Product List

```
(App)/index.tsx mounts
    │
    ▼
useFocusEffect → fetchProducts()
    │
    ▼
api.get('/products')  ←  Axios interceptor auto-attaches token
    │
    ▼
Backend: ProductController@index → Product::all() → ProductResource collection
    │
    ▼
Response: { data: [{ id, name, description, price, created_at }, ...] }
    │
    ▼
setProducts(response.data.data || response.data)
    │
    ▼
FlatList renders → ProductCard for each item
    │
    ▼
Pull-to-refresh → onRefresh → fetchProducts(false)
```

### State Management

**No global state library.** State is managed locally with `useState`:

| Screen | State Variables |
|--------|----------------|
| login.tsx | `email`, `password`, `loading` |
| register.tsx | `name`, `email`, `password`, `confirmPassword`, `loading` |
| (app)/index.tsx | `products[]`, `loading`, `refreshing`, `loggingOut` |

For future features (e.g., cart, filters, caching), prefer **React Context** before introducing external state libraries. Only add Redux/Zustand if Context becomes unwieldy.

### Shared Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `ProductCard` | Renders a single product in the list | `product: Product` |
| `ThemedText` | Text with theme-aware color + style presets | `style?`, `children` |
| `ThemedView` | View with theme-aware background | `style?`, `children` |
| `Collapsible` | Animated expandable section | `title`, `children` |
| `ExternalLink` | Opens URL in in-app browser / new tab | `href`, `children` |

---

## 8. Database Schema

### `users` table

```sql
CREATE TABLE users (
    id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name              VARCHAR(255) NOT NULL,
    email             VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password          VARCHAR(255) NOT NULL,       -- Hashed (model casts)
    role              ENUM('admin', 'client') NOT NULL DEFAULT 'client',
    remember_token    VARCHAR(100) NULL,
    created_at        TIMESTAMP NULL,
    updated_at        TIMESTAMP NULL
);
```

### `products` table

```sql
CREATE TABLE products (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT NULL,
    price       DECIMAL(8, 2) NOT NULL,
    created_at  TIMESTAMP NULL,
    updated_at  TIMESTAMP NULL
);
```

### `personal_access_tokens` table (Sanctum)

```sql
CREATE TABLE personal_access_tokens (
    id             BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tokenable_type VARCHAR(255) NOT NULL,              -- App\Models\User
    tokenable_id   BIGINT UNSIGNED NOT NULL,
    name           VARCHAR(255) NOT NULL,               -- 'auth_token'
    token          VARCHAR(64) NOT NULL UNIQUE,
    abilities      TEXT NULL,
    last_used_at   TIMESTAMP NULL,
    expires_at     TIMESTAMP NULL,
    created_at     TIMESTAMP NULL,
    updated_at     TIMESTAMP NULL,
    INDEX(tokenable_type, tokenable_id)
);
```

### Seed Data

**Users** — `UserSeeder`: 3 users (1 admin + 2 clients)
**Products** — `ProductSeeder`: 5 sample products:
1. Wireless Mouse — $25.50
2. Mechanical Keyboard — $89.99
3. 27" Monitor 4K — $349.00
4. USB-C Hub 7-in-1 — $45.00
5. Webcam HD 1080p — $60.00

---

## 9. User Stories

### Implemented

| Story | As a... | I want to... | So that... | Status |
|-------|---------|-------------|------------|--------|
| US-001 | Visitor | Register an account with name, email, password | I can access the system | ✅ |
| US-002 | Client | Log in with my email and password | I can view products | ✅ |
| US-003 | Client | Log out | I can secure my session | ✅ |
| US-004 | Client | View a list of all available products | I can browse what's for sale | ✅ |
| US-005 | Admin | Log in via web portal | I can manage the system | ⬜ (blocked on mobile) |
| US-006 | Admin | Create a new product | I can add items to the catalog | ✅ |
| US-007 | Admin | Update an existing product | I can correct or change product details | ✅ |
| US-008 | Admin | Delete a product | I can remove outdated items | ✅ |
| US-009 | Admin | View all users | I can see who has accounts | ✅ |

### Future / Planned

| Story | Priority | Notes |
|-------|----------|-------|
| US-010 | High | Admin web portal (React/Inertia/Livewire) |
| US-011 | Medium | Product search by name |
| US-012 | Medium | Product filtering by price range |
| US-013 | Medium | Paginated product list |
| US-014 | Low | Product image upload |
| US-015 | Low | Email verification |
| US-016 | Low | Password reset |
| US-017 | Low | Product categories/tags |

---

## 10. Testing Patterns

### Backend (PHPUnit)

**Configuration**: `phpunit.xml` — uses SQLite `:memory:` for all tests, migrates before each test.

**Test Base**: `Tests\TestCase` — extends `Tests\CreatesApplication`.

**Pattern**: Every test class uses `RefreshDatabase` trait and follows `{action}_{condition}` naming:

```php
use RefreshDatabase;

public function test_unauthenticated_user_cannot_access_products() { ... }
public function test_client_can_list_products() { ... }
public function test_client_cannot_create_product() { ... }
public function test_admin_can_create_product() { ... }
```

**Helper methods in test classes**:
```php
protected function getAdminUser(): User {
    return User::factory()->create(['role' => 'admin']);
}
protected function getClientUser(): User {
    return User::factory()->create(['role' => 'client']);
}
```

**Common assertions used**:
- `assertStatus(201|200|401|403|404|422)`
- `assertJsonStructure([...])`
- `assertJsonPath('data.name', 'Expected Name')`
- `assertJsonCount(3, 'data')`
- `assertDatabaseHas('table', [...])`
- `assertDatabaseMissing('table', [...])`
- `assertJsonValidationErrors([...])`

**Execute tests**:
```bash
cd backend && php artisan test
# or
cd backend && vendor/bin/phpunit
```

### Frontend

**No test suite exists yet.** When adding tests, use **Jest** (bundled with Expo) with React Native Testing Library. Place test files co-located with source: `ComponentName.test.tsx` next to `ComponentName.tsx`.

---

## 11. Environment & Configuration

### Frontend

| File | Key Variables |
|------|--------------|
| `src/api/axios.ts` | `API_URL = 'http://192.168.100.198:8000/api'` — ⚠ Must update for your environment |

### Backend

| File | Key Variables |
|------|--------------|
| `.env` | `DB_CONNECTION=mysql`, `DB_DATABASE=product_mgmt`, `DB_USERNAME=laravel_user`, `DB_PASSWORD=SecurePassword123!` |
| `.env` | `APP_KEY=base64:...` (already set) |
| `.env` | `SESSION_DRIVER=database`, `QUEUE_CONNECTION=database`, `CACHE_STORE=database` |

### Local Development Setup

```bash
# 1. Start backend
cd backend
cp .env.example .env        # Edit DB credentials
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8000

# 2. Start frontend (separate terminal)
cd frontend
npm install
npx expo start

# 3. Update API URL
# Edit frontend/src/api/axios.ts → set API_URL to your machine's LAN IP
```

---

## 12. Coding Standards & Best Practices

### General Principles

1. **Single Responsibility** — Each file/function does one thing.
2. **Explicit over Implicit** — Prefer clear code over "clever" code.
3. **No Stubs / TODOs in commits** — Every deliverable must be complete.
4. **Symmetry** — Create ↔ Delete, Register ↔ Logout, Request ↔ Response should mirror each other.
5. **Fail Fast** — Validate at boundaries (form requests, API interceptors).

### Frontend Standards

#### Naming Conventions
- **Files**: `kebab-case` for utility/component files (`product-card.tsx`), filesystem routing uses `(group)` and standard names
- **Components**: `PascalCase` (`ProductCard.tsx`, `ThemedText.tsx`)
- **Functions/Variables**: `camelCase` (`fetchProducts`, `handleLogin`)
- **Types/Interfaces**: `PascalCase` (`Product`, `UserResource`)
- **Constants**: `UPPER_SNAKE_CASE` for exported constants, `camelCase` for module-level consts

#### File Organization
- **Components** belong in `components/`, grouped by domain if >5 per group
- **Screens** are files inside `app/` — Expo Router file-based
- **API client** goes in `api/`
- **Types** go in `types/index.ts` (co-locate with source if growing)
- **Hooks** go in `hooks/`
- **Utilities** go in `utils/`

#### Component Rules
- Default export for page components
- Named export for shared components (or default when single export)
- Props typed with interface, defined above component
- Styles via `StyleSheet.create()` at bottom of file
- No inline `StyleSheet.create()` — always at module level

#### State Management Rules
- `useState` for local screen state
- `useFocusEffect` for data fetching on screen focus
- Pull-to-refresh via `RefreshControl` in `FlatList`
- Error handling: always `.catch()` with user-facing `Alert.alert()`
- Loading states: `ActivityIndicator` with descriptive text

#### API Calls
```typescript
// ✅ CORRECT pattern
const fetchProducts = async (showLoader = true) => {
  if (showLoader) setLoading(true);
  try {
    const response = await api.get('/products');
    setProducts(response.data.data || response.data);
  } catch (error) {
    Alert.alert('Error', 'Failed to load products. Please try again.');
  } finally {
    if (showLoader) setLoading(false);
  }
};
```

#### What NOT to do
- ❌ Import from relative paths when `@/` alias works
- ❌ Use `any` type — prefer `unknown` + narrowing or explicit interfaces
- ❌ Mutate state directly — always use setter functions
- ❌ Add new npm packages without evaluating bundle size impact
- ❌ Ignore platform differences — test on Android and iOS

### Backend Standards

#### Naming Conventions
- **Controllers**: `{Resource}Controller` with singular resource name
- **Requests**: `{Action}{Resource}Request` (e.g., `StoreProductRequest`)
- **Resources**: `{Resource}Resource` (e.g., `ProductResource`)
- **Middleware**: `Is{Attribute}` (e.g., `IsAdmin`)
- **Routes**: `kebab-case` URLs, `camelCase` controller method names

#### Controller Patterns
- Keep controllers thin — validation in Form Requests, response shaping in Resources
- `index()` returns `AnonymousResourceCollection`
- `store()`/`update()` return `Resource` with appropriate status
- `destroy()` returns `JsonResponse` with message

```php
// ✅ CORRECT controller pattern
public function store(StoreProductRequest $request): ProductResource
{
    $product = Product::create($request->validated());
    return new ProductResource($product);
}
```

#### Model Best Practices
- Use `$fillable` (not `$guarded`) for mass-assignment protection
- Hash passwords via model casts: `'password' => 'hashed'`
- Use `HasApiTokens` trait on User for Sanctum
- Keep custom query logic in scopes or local query methods

#### Form Request Validation
- Each endpoint gets its own Form Request class
- Rules arrays are flat and descriptive
- `authorize()` returns `true` (RBAC handled by middleware)

#### API Resource / JSON Shaping
- Always cast types explicitly in `toArray()`: `(float) $this->price`
- Never expose sensitive fields (password, remember_token)
- Consistent key naming across all resources

#### Middleware
- Single responsibility: one check per middleware
- Return consistent error structures

### General Do's and Don'ts

| Do | Don't |
|----|-------|
| ✅ Use `@/` path aliases | ❌ Use relative imports with `../../` |
| ✅ Keep functions under 30 lines | ❌ Create "god functions" |
| ✅ Handle all error states | ❌ Assume success |
| ✅ Type everything explicitly | ❌ Overuse `any` / `mixed` |
| ✅ Test edge cases (0, empty, null, not found) | ❌ Only test the happy path |
| ✅ Use `async/await` with try/catch | ❌ Use raw `.then().catch()` chains |
| ✅ Run `php artisan test` before backend commits | ❌ Skip tests |
| ✅ Read Expo v56 docs before writing code (per AGENTS.md) | ❌ Assume old API knowledge |

---

## 13. Update & File Addition Guidelines

### How to Add a New Screen

1. Create the file in the appropriate `app/` directory:
   - `app/(auth)/` for login-related screens
   - `app/(app)/` for authenticated screens
   - `app/` for standalone screens

2. Expo Router automatically registers the route.

3. If the screen needs auth, place it inside `(app)/` group; the auth guard in `index.tsx` handles protection.

4. For a new stack group, add a `_layout.tsx` with the Stack navigator.

### How to Add a New API Endpoint

**Backend:**
1. Create Form Request in `app/Http/Requests/` (if validation is needed)
2. Create controller method in appropriate controller (or new controller)
3. Create API Resource in `app/Http/Resources/` (if response shaping needed)
4. Register the route in `routes/api.php`
5. Add middleware as needed (`auth:sanctum`, `isAdmin`)
6. Write PHPUnit tests in `tests/Feature/`

**Frontend:**
1. Add API call in the screen/component using `api.get/post/put/delete()`
2. Update types in `types/index.ts` if new data shapes are introduced

### How to Add a New Database Table

1. Create migration: `php artisan make:migration create_{table}_table`
2. Define schema with proper types, defaults, and indexes
3. Create Model: `php artisan make:model {ModelName}`
4. Create Factory (for testing): `php artisan make:factory {ModelName}Factory`
5. Create API Resource (if exposed via API)
6. Create Form Requests (if user-submitted)
7. Create controller + routes
8. Register route in `routes/api.php`

### How to Modify Existing Code

1. **Read the file first** — understand the full context before editing
2. **Check for callers** — use grep to find all usages
3. **Update types** — if adding/changing fields, update TypeScript interfaces
4. **Update tests** — ensure existing tests still pass; add new test cases
5. **Run tests** — `php artisan test` for backend

### File Addition Rules

- **No new files without justification** — prefer modifying existing files
- **No new npm packages without evaluation** — consider bundle size, maintenance status, license
- **No new Composer packages without evaluation** — check for Laravel compatibility, security
- **No documentation files unless explicitly requested** (README, CONTRIBUTING, etc.)
- **No emojis in code** — unless the user explicitly asks for them

---

## 14. Security Constraints

### Non-Negotiable Rules

1. **Sanctum token is the only auth mechanism** — never implement custom token logic
2. **Admin block is CLIENT-SIDE only** — a malicious client could modify the app; the API must still enforce RBAC via middleware
3. **Password hashing** — automatic via Laravel model `'password' => 'hashed'` cast; never hash manually
4. **Mass assignment protection** — always use `$fillable`
5. **Validation at the boundary** — all user input validated in Form Requests
6. **No secrets in code** — API keys, DB passwords, app keys go in `.env`
7. **CORS** — if adding new frontend origins, configure CORS in Laravel
8. **SQL injection** — use Eloquent ORM (parameterized queries); never raw SQL with string interpolation
9. **XSS** — React handles escaping; on web, avoid `dangerouslySetInnerHTML`
10. **Token exposure** — never log tokens, never display them in UI

---

## 15. Known Design Decisions & Trade-offs

| Decision | Rationale | Trade-off |
|----------|-----------|-----------|
| **No global state management** | Simple app, few screens, minimal shared state | Will need Context/Redux for cart, user prefs |
| **Client-side admin block** | Separate mobile UX from admin web portal | Not truly secure; must enforce RBAC server-side |
| **SQLite for tests, MySQL for production** | Speed + isolation in test env | Occasional MySQL-specific quirks missed |
| **File-based routing (expo-router)** | Convention over configuration, automatic deep linking | Less flexible than React Navigation for complex nav |
| **Sanctum tokens (not JWT)** | Simple, built-in, no refresh token complexity | Stateless scaling harder; all tokens in DB |
| **No pagination yet** | Small dataset (< 100 products) | Must add before product catalog grows |
| **StyleSheet.create() (no Tailwind/NativeWind)** | Zero runtime cost, type-safe | More verbose for complex styles |
| **Inline Alert.alert() for errors** | Simple, works cross-platform | No toast/snackbar system; less polished UX |

---

## Quick Reference Commands

```bash
# Backend
cd backend
php artisan serve --host=0.0.0.0 --port=8000   # Start API server
php artisan migrate --seed                       # Reset DB with seed data
php artisan test                                  # Run all tests
php artisan make:controller Api/XController      # New API controller
php artisan make:model X -m                      # New model + migration
php artisan make:request XRequest                # New form request
php artisan make:resource XResource              # New API resource

# Frontend
cd frontend
npx expo start                                    # Start dev server
npx expo start --web                              # Start for web
npx expo start --android                          # Start for Android
npx expo start --ios                              # Start for iOS
```

---

> **Last updated**: June 30, 2026
> **Expo SDK**: 56.0.x (see AGENTS.md — always check v56 docs before coding)
> **Laravel**: 13.x
