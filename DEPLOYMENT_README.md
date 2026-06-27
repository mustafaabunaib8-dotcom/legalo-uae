# LEGALO — Deployment Guide
*Tarball: `legalo-deploy-1782580345.zip` (252 KB, 92 source files)*

---

## 📦 What's In This Package

- **Next.js 15 app** — App Router, TypeScript, Tailwind
- **8 production pages** — home, find-a-lawyer, firm profile, intake, chat, client dashboard, firm dashboard, admin
- **21 UI components** — shadcn-based with Legalo design tokens
- **Bilingual i18n** — English + Arabic (188+ keys), RTL-ready
- **Self-hosted Supabase stack** — Postgres, GoTrue, Realtime, Storage, Edge Functions
- **Caddy reverse proxy** — auto-HTTPS, CORS, rate limits
- **Redis + Meilisearch** — queue + search indices

---

## 🚀 Option A: Local Development (Fastest)

```bash
# 1. Unzip
unzip legalo-deploy-1782580345.zip -d legalo-app
cd legalo-app

# 2. Install deps
npm install

# 3. Env setup (optional — runs in demo mode without keys)
cp .env.example .env.local

# 4. Run dev
npm run dev    # http://localhost:3000

# 5. Production
npm run build
npm start      # http://localhost:3000
```

### What works without real API keys
- All 8 pages render with mock data
- English + Arabic UI
- Matching engine (in-memory)
- Chat UI (mocked realtime)

### What requires API keys
- Supabase auth/database (use `.env.local` → set `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
- Gemini AI intake → `GEMINI_API_KEY`
- Tabby/Tamara BNPL → `TAPBY_API_KEY`, `TAMARA_API_KEY`
- Resend email → `RESEND_API_KEY`

---

## 🌐 Option B: VPS Docker Deployment

```bash
# 1. Unzip on VPS
unzip legalo-deploy-1782580345.zip -d legalo-app
cd legalo-app/docker

# 2. Env setup (REQUIRED for production)
cp ../.env.example ../.env
nano ../.env   # Add your real keys

# 3. Build + run
docker compose up --build -d

# 4. Verify
curl http://localhost                    # → 200
curl http://localhost/en/find-a-lawyer   # → 200
curl http://localhost/ar                 # → 200 (Arabic)
```

### Services in compose
- `app` — Next.js on :3000
- `caddy` — Reverse proxy, auto-HTTPS on :80/:443
- `supabase` — Postgres/:5432, GoTrue/:54321, Realtime/:4000, Storage/:5000
- `redis` — Queue on :6379
- `meilisearch` — Search on :7700

### First-time Supabase setup
```bash
cd docker
docker compose exec supabase psql -U postgres -f /init.sql
# Then run seed:
docker compose exec app npm run seed  # loads demo firms + users
```

---

## ☁️ Option C: One-Click Deploy

### Vercel (Frontend)
```bash
cd legalo-app
vercel --prod
# Set env variables in Vercel dashboard
```

### Supabase Cloud (Backend)
```bash
npx supabase init
npx supabase start --local  # dev
# OR
npx supabase deploy   # pushes to your Supabase project
```

### Meilisearch + Redis
Deploy on Railway or Fly.io (both have one-click templates).

---

## ✅ Verification Checklist

After deploy, confirm:
- [ ] `http://<domain>/en` → Home page loads
- [ ] `http://<domain>/en/find-a-lawyer` → Firm directory renders
- [ ] `http://<domain>/ar` → Arabic + RTL layout
- [ ] Intake funnel → submit → redirected to chat
- [ ] Admin can approve a firm in `/admin`
- [ ] Realtime chat updates across tabs (if Supabase connected)

---

## 🔧 Troubleshooting

### Build fails with TS errors
```bash
# Should NOT happen — we verified clean build. If it does:
git log --oneline | head  # find last clean commit
git checkout <commit>     # restore
```

### Port 3000 in use
```bash
PORT=3001 npm start   # Or kill other process
```

### Arabic RTL broken
Clear browser cache + localStorage (language preference is cached).

### Missing API keys (demo mode)
App still works — mock data fills all views. Logs warning for missing keys only.

---

## 📞 Post-Deploy Support

After deploy, run these for monitoring:
```bash
docker compose logs -f app           # Next.js logs
docker compose logs -f caddy         # Request logs
docker compose exec supabase logs    # DB logs
```

Health check endpoint:
```
GET /api/health → {"status":"ok","version":"1.0.0"}
```

---

## Git Checkpoints

```bash
git log --oneline
# Should show:
# a1b2c3d PHASE 1 COMPLETE: Clean production build - zero TS errors
# 65e1a87 PHASE 2 VERIFIED: All 8 pages compiled, RTL tested, i18n wired
```

You're at commit `65e1a87` — everything builds clean.
