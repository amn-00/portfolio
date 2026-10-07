# aman.dev — retro pixel portfolio

React + Vite + Tailwind CSS v4.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Edit content
Everything (name, projects, links, skills, achievements, FAQ answers) is in
**`src/data/portfolio.js`**. Add a project by copying one object in `projects`.

Colors and fonts are tokens at the top of **`src/index.css`** (`@theme` block).

| File | What it is |
|---|---|
| `src/components/PixelScene.jsx` | Animated hero pixel art (canvas) |
| `src/components/PixelIcon.jsx` | Pixel icons (logo, achievements) — drawn from character grids |
| `src/components/Projects.jsx` | Search + filter project board |
| `src/components/AskWidget.jsx` | "Ask me anything" quick-answer chat |

## Deploy on Vercel
1. Push this folder to a GitHub repo (e.g. `amn-00/portfolio`).
2. vercel.com → Add New → Project → import the repo.
3. Framework preset: **Vite** (auto-detected). Build `npm run build`, output `dist`. Deploy.
4. Optional: Settings → Domains to add a custom domain.
