# Product Management System — Backend

## Tech Stack

- **Language:** PHP ^8.3
- **Framework:** Laravel 13.8
- **API Auth:** Laravel Sanctum ^4.0 (token-based)
- **Web SPA:** Inertia.js ^2.0 + React 18.3.1
- **Build:** Vite 8.0 + Laravel Vite Plugin
- **CSS:** Tailwind CSS ^3.4.19 (custom dark theme: obsidian/electric palette)
- **Database:** MySQL (default), SQLite (dev)
- **Testing:** PHPUnit ^12.5 (16 feature tests)
- **Infra:** Docker Compose (PHP-FPM + Nginx + MariaDB + Node 22)

## Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Api/         AuthController, ProductController, UserController
│   │   ├── Admin/       DashboardController, ProductController, UserController
│   │   └── ...          DashboardController, ProfileController
│   ├── Middleware/       AdminOnly, IsAdmin, HandleInertiaRequests
│   ├── Requests/        FormRequest validation (Login, Register, StoreProduct, etc.)
│   └── Resources/       ProductResource, UserResource (JSON transformation)
├── Models/              User (HasApiTokens), Product
├── Providers/           AppServiceProvider (Vite prefetch)
database/
├── migrations/          Users, products, personal_access_tokens, cache, jobs
├── factories/           UserFactory, ProductFactory
└── seeders/             DatabaseSeeder (admin + 2 clients + 5 products)
routes/
├── api.php              RESTful API routes
├── web.php              Inertia SPA routes (admin + client dashboards)
├── auth.php             Web auth routes
└── console.php          Artisan commands
resources/js/
├── Pages/               React pages (Admin/Dashboard, Admin/Products, Admin/Users, Auth/*, Profile/*)
├── Components/          12 reusable React components
└── Layouts/             AdminLayout, GuestLayout
```

## Architecture

- **Dual Interface:** REST API (Sanctum tokens) + Web SPA (Inertia.js sessions)
- **Auth:** Session-based for web, token-based (Sanctum) for API. Rate-limited login (5/min).
- **RBAC:** Two roles — `admin` and `client`. Enforced via `AdminOnly` (web redirect) and `IsAdmin` (API 403) middleware.
- **API Resources:** Eloquent API Resources transform models to consistent JSON.
- **Validation:** Dedicated FormRequest classes for all mutations.
- **Error Handling:** API exceptions render as JSON; web uses Inertia error bags.

## Database Schema

| Table | Key Columns |
|-------|-------------|
| `users` | id, name, email (unique), password, role (enum: admin/client) |
| `products` | id, name, description, price (decimal 8,2) |
| `personal_access_tokens` | Sanctum tokens (polymorphic) |
| `sessions` | Web session storage |

## API Routes

| Method | Endpoint | Auth | Admin |
|--------|----------|------|-------|
| POST | `/api/register` | Public | - |
| POST | `/api/login` | Public | - |
| POST | `/api/logout` | Sanctum | - |
| GET | `/api/products` | Sanctum | - |
| POST/PUT/DELETE | `/api/products/{id}` | Sanctum | Yes |
| GET | `/api/users` | Sanctum | Yes |
| PUT | `/api/users/{id}/role` | Sanctum | Yes |

## Web Routes (Inertia SPA)

| Path | Purpose |
|------|---------|
| `/dashboard` | Client dashboard |
| `/admin/dashboard` | Admin dashboard (stats) |
| `/admin/products` | Admin product CRUD (paginated) |
| `/admin/users` | Admin user list + role management |
| `/profile` | Profile edit, password change, account deletion |
| `/login` / `/register` | Auth pages (registration disabled) |

## Features

- **Product CRUD:** Admin creates, reads, updates, deletes products. Clients list only.
- **User Management:** Admin lists users and toggles roles (admin/client).
- **Client Dashboard:** Welcome page for authenticated clients.
- **Admin Dashboard:** Product count, user count, recent products.
- **Profile Management:** Name/email update, password change, account deletion (with confirmation).
- **Seed Data:** Admin (`admin@app.com`), 2 clients, 5 sample products.

## Running Locally

```bash
cp .env.example .env
composer install
npm install && npm run build
php artisan migrate --seed
php artisan serve
```

## Docker

```bash
docker compose up -d
```

Services: `app` (PHP-FPM), `nginx` (web server), `node` (Vite HMR), `mariadb` (database).
