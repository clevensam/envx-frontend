# EnvX Frontend

React dashboard for managing secrets and environment variables, inspired by GitHub's UI.

## Tech Stack

- **React 19** + **Vite 8** — Frontend framework
- **Tailwind CSS 4** — Styling with GitHub-inspired design tokens
- **Zustand** — State management
- **Axios** — HTTP client with JWT interceptors
- **React Router** — Client-side routing
- **Lucide React** — Icons

## GitHub-Inspired UI

Every page maps to a familiar GitHub pattern:

- **Dashboard** → GitHub "Your repositories"
- **Project detail** → GitHub repo page with UnderlineNav tabs
- **Secrets** → GitHub "Settings → Secrets and variables"
- **Team** → GitHub "Settings → Manage access"
- **Audit** → GitHub "Security → Audit log"
- **Auth** → GitHub login/register (centered card)

## Pages

| Route | Page |
|---|---|
| `/login` | Login |
| `/register` | Register |
| `/` | Dashboard — project cards |
| `/projects/:id` | Project detail with tabs |
| `/projects/:id/env/:envId` | Secret management table |

## Local Development

```bash
cp .env.example .env
# Edit VITE_API_URL to point to your backend
npm install
npm run dev
```

## Deploy to Vercel

1. Import repo to Vercel
2. Set environment variable: `VITE_API_URL=https://your-backend.onrender.com`
3. Vercel auto-detects Vite and builds automatically
4. `vercel.json` handles SPA routing for all paths
