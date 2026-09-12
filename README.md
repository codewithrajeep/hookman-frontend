# Hookman Frontend

> The dashboard interface for Hookman — a webhook delivery platform with guaranteed delivery, automatic retries, and real-time monitoring.

![CI](https://github.com/codewithrajeep/hookman-frontend/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)

---

## What is Hookman?

Hookman is a webhook delivery service. This repository is the frontend dashboard that lets users:

- Register webhook endpoints
- Send and monitor events
- View delivery attempts and retry history
- Replay dead letter events
- See real-time delivery status via WebSocket

The backend lives at [hookman-backend](https://github.com/codewithrajeep/hookman-backend).

---

## Tech Stack

- **Framework:** Next.js 16 + TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui (Base UI, Nova preset)
- **State Management:** Zustand v5
- **Data Fetching:** TanStack Query v5
- **Real-time:** Socket.io client
- **Auth:** httpOnly cookie (JWT)
- **Package Manager:** pnpm

---

## Project Status

| Phase   | Description                                          | Status         |
| ------- | ---------------------------------------------------- | -------------- |
| Phase 1 | Foundation — setup, CI, types, API client, providers | ✅ Complete    |
| Phase 2 | Auth — login, register, middleware, cookie auth      | ✅ Complete    |
| Phase 3 | Dashboard — stats overview, recent events            | 🔄 In Progress |
| Phase 4 | Endpoints — list, create, detail pages               | ⬜ Planned     |
| Phase 5 | Events — list, detail, delivery attempts             | ⬜ Planned     |
| Phase 6 | Dead Letters — list, replay                          | ⬜ Planned     |
| Phase 7 | Polish + Animations + Mobile                         | ⬜ Planned     |

---

## Pages

| Route            | Description                           | Auth      |
| ---------------- | ------------------------------------- | --------- |
| `/`              | Landing page                          | Public    |
| `/login`         | Login with email and password         | Public    |
| `/register`      | Create a new account                  | Public    |
| `/dashboard`     | Stats overview and recent events      | Protected |
| `/endpoints`     | List and manage webhook endpoints     | Protected |
| `/endpoints/:id` | Endpoint detail with events           | Protected |
| `/events/:id`    | Event detail with delivery attempts   | Protected |
| `/dead-letters`  | Permanently failed events with replay | Protected |

---

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- Hookman backend running (local or production)

### Installation

```bash
git clone https://github.com/codewithrajeep/hookman-frontend.git
cd hookman-frontend
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
```

| Variable            | Description                                                           | Required |
| ------------------- | --------------------------------------------------------------------- | -------- |
| `BACKEND_URL`       | Backend API + WebSocket URL (used by Next.js rewrites)                | Yes      |
| `MIN_REQUEST_DELAY_MS` | Minimum loading time for API requests (ms) — useful for UI polish URL | No       |

For local development:

```
BACKEND_URL=http://localhost:4000
MIN_REQUEST_DELAY_MS=2000
```

For production:

```
BACKEND_URL=https://hookman-backend.onrender.com
MIN_REQUEST_DELAY_MS=2000
```

> [!NOTE]
> All API and Socket.io traffic is proxied through Next.js rewrites (`/api/*` and `/socket.io/*`) to `BACKEND_URL`. This keeps auth cookies same-origin and readable by `proxy.ts`.

### Running Locally

```bash
pnpm dev
```

App starts at `http://localhost:3000`

### Validation Scripts

```bash
# lint + typecheck + build
./scripts/build-test.sh

# dev server + route health check
./scripts/dev-test.sh

# test against production
./scripts/dev-test.sh https://hookman-frontend.vercel.app
```

---

## Project Structure

```
src/
├── app/
│ ├── (auth)/
│ │ ├── login/
│ │ └── register/
│ ├── (dashboard)/
│ │ ├── layout.tsx
│ │ ├── dashboard/
│ │ ├── endpoints/
│ │ ├── events/
│ │ └── dead-letters/
│ ├── layout.tsx
│ ├── page.tsx
│ └── providers.tsx
├── components/
│ ├── app-shell.tsx
│ ├── status-badge.tsx
│ ├── theme-provider.tsx
│ └── ui/
├── lib/
│ ├── api.ts
│ ├── socket.ts
│ ├── mock-data.ts
│ └── utils.ts
├── store/
│ └── auth.store.ts
├── types/
│ └── index.ts
└── proxy.ts
```

---

## Auth Flow

```
User submits login form
↓
POST /api/v1/auth/login (proxied via Next.js rewrites → BACKEND_URL)
↓
Backend sets httpOnly cookie on the frontend's own domain
↓
Frontend saves user object to Zustand store
↓
proxy.ts checks the cookie on every protected route
↓
No cookie → redirect to /login
Cookie exists → allow access
```

---

## Real-time

Hookman uses Socket.io for live delivery updates:

```
User logs in → connectSocket(userId) called
↓
Client connects to same-origin /socket.io (proxied to BACKEND_URL)
↓
Client joins room by userId
↓
Backend emits delivery:success or delivery:failed
↓
Frontend shows toast notification
```

---

## CI/CD

```
feat/* → PR → development → auto PR → main → Vercel deploy
```

- CI runs lint + typecheck + build on every push and PR
- Auto PR from development to main on every merge
- Vercel deploys automatically on merge to main
- Preview deployments on every PR

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full contributor guide.

---

## Backend

The backend API is at [hookman-backend](https://github.com/codewithrajeep/hookman-backend).

---

## License

ISC © [Rajeep](https://github.com/codewithrajeep)
