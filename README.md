# Alexander Infante: Portfolio

Personal portfolio built with **Next.js 15 (static export)**, **Tailwind CSS v4**, and **framer-motion**, using components adapted from [Aceternity UI](https://ui.aceternity.com): Stars & Shooting Stars background, Spotlight, Text Generate Effect, Floating Navbar, Timeline, Bento Grid, Meteors, Infinite Moving Cards, and Moving Border.

## Edit content

Everything on the site (jobs, projects, skills, links) lives in [`lib/data.ts`](lib/data.ts). Change it there and push.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Deploy to GitHub Pages (one-time setup)

1. Create a **public** repo named **`Alexander-Infante.github.io`** on GitHub.
   That name makes the site live at `https://alexander-infante.github.io` (no sub-path).
   Any other repo name works too; it'll be served at `https://alexander-infante.github.io/<repo-name>/`
   and the workflow sets the base path for you.
2. Push this folder:
   ```bash
   npm install            # creates package-lock.json; commit it
   git init && git add . && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/Alexander-Infante/Alexander-Infante.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Every push to `main` now builds and deploys automatically (see `.github/workflows/deploy.yml`).

### Custom domain (optional)

Add a `public/CNAME` file containing your domain (e.g. `alexinfante.com`), point a CNAME DNS record at
`alexander-infante.github.io`, then set the domain under **Settings → Pages**. Also set
`NEXT_PUBLIC_SITE_URL` (or edit `site.url` in `lib/data.ts`) so social previews use the right URL.
