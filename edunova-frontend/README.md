# EduNova Frontend

React + TypeScript + Tailwind CSS frontend for EduNova Global Academy.

This first pass covers the **public marketing site** (Bucket 1): Home, About,
Admissions, Academics, Facilities, Faculty, Contact, FAQ, and a Login screen
that is UI-only for now. Gallery / News / Privacy / Terms are placeholder
pages so routing doesn't 404 while we build them out.

## Getting started

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`.

## Next step: connecting to the backend

The Login page (`src/pages/Login.tsx`) has a `handleSubmit` stub with the
exact request/response shape needed for `POST /api/v1/auth/login/` noted
inline. Once we start backend integration, that's the natural entry point —
followed by an `api/axiosClient.ts` for the JWT + tenant-subdomain handling
described in the backend's `FRONTEND_API_GUIDE.md`.

## Structure

```
src/
  components/
    layout/    Navbar, Footer, Logo
    ui/        Button, Container, Eyebrow, PageHeader, Reveal
    home/      Landing page sections (Hero, RoleTabs, ModulesGrid, etc.)
  data/        Site copy sourced from the EduNova brand doc
  hooks/       useReveal (scroll-triggered animation)
  pages/       One file per route
```

## Brand tokens (tailwind.config.ts)

| Token | Hex |
|---|---|
| `primary` (Academic Blue) | `#1E3A8A` |
| `secondary` (Education Green) | `#10B981` |
| `accent` (Learning Orange) | `#F97316` |
| `highlight` (Academic Gold) | `#FBBF24` |
| `surface` (Background) | `#F8FAFC` |
| `night` (Dark Background) | `#0F172A` |

Fonts: Poppins (`font-display`), Nunito (`font-sub`), Inter (`font-body`),
Montserrat (`font-num`) — loaded via Google Fonts in `index.html`.
