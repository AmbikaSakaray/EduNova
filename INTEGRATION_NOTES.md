# EduNova — Frontend ↔ Backend Integration Notes

Good news first: most of this was already wired up correctly (Students, Staff,
Attendance, Exams, Finance, LMS, Operations, Timetable all already call the
real Django REST endpoints via `src/lib/api.ts`, and the field names already
match the DRF serializers). The gaps below were the reason things still felt
"non-functional," and they're now fixed.

## What was actually broken

1. **`/api/v1/users/` didn't exist on the backend.**
   The admin Users panel (`src/pages/admin/Users.tsx`) called
   `GET/POST/PATCH/DELETE /api/v1/users/`, but the Django URLconf had no
   matching route — only `roles/`, `permissions/`, etc. existed.
   → Added `UserListCreateView` / `UserDetailView` in
   `apps/authentication/views.py`, wired at the top level in
   `config/urls.py`, so it matches what the frontend already calls. Creating
   or editing a user now also accepts an optional `password` field and
   hashes it properly instead of leaving the account unusable.

2. **`AdminGuard` didn't actually guard anything.**
   It just rendered `<AdminLayout>` unconditionally — anyone could open
   `/admin` directly with no login. It now checks `useAuth()` and redirects
   to `/login` if there's no session, or to `/` if the logged-in user isn't
   `Super Admin` / `School Admin`.

3. **The admin Dashboard was 100% hardcoded fake numbers** (`1,240 users`,
   `6,502 students`, etc., regardless of what was in the database). It now
   pulls live counts from `/api/v1/users/`, `/api/v1/students/`, and
   `/api/v1/staff/employees/`.

4. **Multi-tenant routing meant every "real" API call would 404.**
   This backend uses `django-tenants` (schema-per-school). Endpoints like
   `students`, `academics`, `exams`, `billing`, etc. only exist inside a
   *tenant* schema — not in the shared `public` schema. The frontend's
   `.env` was pointing at plain `http://localhost:8000` (the public schema),
   so none of those tables actually existed there.
   → Added `apps/tenants/management/commands/bootstrap_dev.py`, which
   creates the public tenant, a default **`edunova`** school tenant with
   domain `edunova.localhost`, and seeds a `Super Admin` user inside it.
   → Updated `edunova-frontend/.env` to point at
   `http://edunova.localhost:8000` so every admin page actually resolves to
   a schema with migrated tables.

## How to run it end-to-end locally

```bash
# Backend
cd Edunova/backend
pip install -r requirements.txt
docker-compose up -d db redis        # or point DATABASE settings at your own Postgres
python manage.py migrate_schemas --shared     # migrates the public schema
python manage.py bootstrap_dev                # creates the 'edunova' tenant + admin user
python manage.py migrate_schemas              # migrates the new tenant schema
python manage.py runserver 0.0.0.0:8000

# Add this once to your OS hosts file so the subdomain resolves locally:
# 127.0.0.1  edunova.localhost

# Frontend
cd edunova-frontend
npm install
npm run dev
```

Default seeded login (from `bootstrap_dev`, change immediately in a real
deployment):
- username: `admin`
- password: `Admin@12345`
- role: `Super Admin` → redirects to `/admin` after login

## Verified

- `python manage.py check` — passes (SQLite settings, no model/URL errors).
- `npx tsc --noEmit` — passes, no type errors from the changes.
- `npm run build` — production build succeeds.
