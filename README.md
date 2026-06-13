# GSM — Strategic Growth Consultancy Website

A modern 5-page React website for GSM (Growth Strategy Management), built with Vite and React Router.

## Pages

- **Home** — Hero, problem/solution, philosophy preview, process, CTA
- **About** — Who we are, philosophy, identity, vision
- **Services** — All four consulting services + engagement model
- **Industries** — Proven market categories and target industries
- **Contact** — Consultation inquiry form

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Replace the logo

1. Add your logo file to `public/` (e.g. `public/logo.svg`)
2. Update `src/components/Logo.jsx` to use an `<img src="/logo.svg" />`, or swap the SVG markup in `Header` and `Footer`

## Customize content

Edit `src/data/content.js` to update copy across all pages.
