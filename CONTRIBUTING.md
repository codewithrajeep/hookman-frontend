# Contributing to Hookman Frontend

Thank you for your interest in contributing to Hookman Frontend. This document covers everything you need to know to get started, follow the project's git flow, and submit your work for review.

> [!NOTE]
> **PRs are welcome!** Please open an issue first to discuss what you'd like to change before writing any code.

---

## Before You Start

- All contributions go through pull requests — no direct pushes to `development` or `main`
- Every feature or fix must have a GitHub issue before any code is written
- Only the repository owner (@codewithrajeep) can review and merge PRs into `development`
- Branch protection is enforced — CI must pass before any PR can be merged

---

## Setup

### Prerequisites

- Node.js 22+
- pnpm 11+ (matches CI; run `corepack enable` to auto-install)

### 1. Fork and clone

Fork the repository on GitHub, then clone your fork:

```bash
git clone https://github.com/<your-username>/hookman-frontend.git
cd hookman-frontend
```

Add the original repo as upstream to stay in sync:

```bash
git remote add upstream https://github.com/codewithrajeep/hookman-frontend.git
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment

```bash
cp .env.example .env
```

Fill in:

```
BACKEND_URL=http://localhost:4000
MIN_REQUEST_DELAY_MS=2000
```

> All API and Socket.io traffic is proxied through Next.js rewrites to `BACKEND_URL`. Cookies stay same-origin and readable by `proxy.ts`.

### 4. Start the dev server

```bash
pnpm dev
```

App runs at `http://localhost:3000`

---

## Git Flow

```
feat/your-feature → PR → development (owner reviews + merges)
                              ↓
                    auto PR → main → Vercel deploy
```

### Step by step

```bash
# 1. Always start from the latest development branch
git checkout development
git pull upstream development   # if you forked the repo
# or: git pull origin development  # if you cloned directly

# 2. Create your feature branch
git checkout -b feat/your-feature-name

# 3. Write your code

# 4. Visually test your change
pnpm dev
# → open http://localhost:3000 and verify the feature works

# 5. Run validation before pushing
./scripts/build-test.sh

# 6. Commit with a clear message
git add src/path/to/file.tsx
git commit -m "feat(scope): what you did"

# 7. Push your branch
git push origin feat/your-feature-name

# 8. Open a PR to development on GitHub
```

---

## Branch Naming

| Type    | Pattern             | Example                |
| ------- | ------------------- | ---------------------- |
| Feature | `feat/description`  | `feat/dashboard-stats` |
| Bug fix | `fix/description`   | `fix/login-redirect`   |
| Chore   | `chore/description` | `chore/update-deps`    |
| Docs    | `docs/description`  | `docs/api-reference`   |

---

## Commit Message Format

Follow this pattern:

```
type(scope): short description
```

| Type       | When to use                          |
| ---------- | ------------------------------------ |
| `feat`     | New feature                          |
| `fix`      | Bug fix                              |
| `chore`    | Config, deps, tooling                |
| `docs`     | Documentation                        |
| `style`    | Formatting, no logic change          |
| `refactor` | Code restructure, no behavior change |
| `ui`       | UI/styling changes                   |

Examples:

```
feat(dashboard): add stats overview cards
fix(auth): handle expired token redirect
chore(deps): upgrade tanstack query to v5
ui(endpoints): improve table mobile layout
```

---

## Issue First

Every contribution must have a GitHub issue. Before writing any code:

1. Check if an issue already exists for what you want to do
2. If not, open a new issue with a clear title and description
3. Wait for the owner to assign it to you before starting
4. Reference the issue in your PR using `closes #123`

---

## Pull Request Rules

When opening a PR to `development`:

- Title must follow the commit format: `feat(scope): description`
- Description must include what was built, why, and how to test it
- Link the issue it closes: `closes #123`
- CI must pass (lint + typecheck + build)
- One feature per PR — keep PRs focused and small

### PR description template

GitHub will auto-fill the template from `.github/pull_request_template.md`. Make sure to:

- Fill in what was built and why
- Include how to test it
- Link the issue it closes: `closes #123`

---

## Code Standards

- All components in `src/components/` — no inline component definitions in pages
- All UI components from shadcn/ui only
- All icons from lucide-react only
- No inline styles — Tailwind classes only
- TypeScript strict mode — no `any` unless absolutely unavoidable
- Every API call goes through `src/lib/api.ts`
- State management through Zustand stores in `src/store/`
- Data fetching through TanStack Query hooks in `src/hooks/`

---

## Validation

Always run before pushing:

```bash
./scripts/build-test.sh
```

This runs:

- ESLint
- TypeScript type check
- Next.js production build

> The `build-test.sh` script mirrors the CI workflow (`.github/workflows/ci.yml`) exactly. If it passes locally, CI will pass.

If any step fails, fix it before pushing. PRs with failing CI will not be reviewed.

---

## What You Cannot Do

- Push directly to `development` or `main`
- Skip git hooks with `--no-verify`
- Merge your own PR
- Skip the issue step
- Add new dependencies without discussing in the issue first
- Change the CI workflow, branch rulesets, or deployment config without approval

---

## Getting Help

Open a GitHub issue if you're stuck or unsure about anything. The owner will respond there.

---

## Review Process

1. You open a PR to `development`
2. CI runs automatically
3. Owner reviews the code, leaves comments if changes are needed
4. You address comments and push fixes to the same branch
5. Owner approves and merges to `development`
6. Auto PR to `main` is created and merged by owner
7. Vercel deploys automatically

---

Thank you for contributing to Hookman.
