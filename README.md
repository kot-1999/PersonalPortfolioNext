# Personal Portfolio

Personal portfolio of Oleksandr (Alex) Kashytskyi — built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS 4**, exported as a fully static site.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
npx serve out    # preview the production build
```

## Editing content

All content lives in [`content/`](./content) — you never need to touch components to update the site.

| File | What it holds |
|------|---------------|
| `content/profile.ts` | Name, role, about text, stats, experience, education, socials, nav, contact form endpoint |
| `content/projects.ts` | Projects (order in the file = order on the site) |
| `content/tech.ts` | Every technology. Ones with `proficiency` appear on the Skills page |
| `content/books.ts` | Personal library |
| `content/types.ts` | Types for all of the above |

### Add a project

1. Put screenshots in `public/projects/<slug>/` (webp, ~1600px wide is plenty).
2. Append an object to `content/projects.ts`. `icon`, `images`, `videoUrl`, `client` and `featured` are optional.
3. `featured: true` shows it on the home page.

A page is generated automatically at `/projects/<slug>/`.

### Add a skill / technology

Add an entry to `content/tech.ts` and drop a square icon at `public/icons/<Key>.png`
(or set `icon: null` for a monogram badge). The key is type-checked everywhere it’s used,
so a typo in a project’s `tech` list fails the build.

### Add a book

Put a cover at `public/books/<slug>.webp` and append to `content/books.ts`.

### Safety net

`npm run build` fails if any image referenced in `content/` is missing from `public/`,
or if two projects share a slug (see `lib/validate-content.ts`).

## Theming

Colors are CSS variables at the top of `app/globals.css` (light + dark via `prefers-color-scheme`).
Components only use the semantic names (`bg`, `surface`, `text`, `muted`, `accent`, …).

## Deploy

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to `main`
(enable *Settings → Pages → Source: GitHub Actions*). It sets `NEXT_PUBLIC_BASE_PATH=/<repo>`
so assets resolve under `https://kot-1999.github.io/<repo>/`. For a custom domain, drop that variable.

Any static host (Vercel, Netlify, Cloudflare Pages) works too — just serve `out/`.
