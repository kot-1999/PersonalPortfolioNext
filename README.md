# Personal Portfolio

Personal portfolio of Oleksandr (Alex) Kashytskyi: backend developer and database architect.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS 4**, and exported as a fully
static site (no server, no runtime data fetching). All content is typed data in [`content/`](./content), so updating
the site rarely means touching a component.

## Pages

| Route | What it shows |
|-------|---------------|
| `/` | Hero with interactive terminal, about, featured projects, experience & education, core stack, library preview |
| `/projects/` | All projects, filterable by category (Personal / Commercial / Open Source / Hackathon) |
| `/projects/<slug>/` | Project detail: facts, screenshot gallery, video, responsibilities, impact, tech stack |
| `/skills/` | Every technology, grouped by category, filterable by level, category and name |
| `/library/` | Books on category "shelves"; click a cover for the summary and takeaways |
| `/contact/` | Contact form (Formspree) plus email and socials |

Tech badges, skill tiles and book covers all open the same small **info popover** on click (see
[Components](#components)).

### The terminal

A small bash-style terminal (`components/Terminal.tsx`) in the home page hero accepts commands:

| Command | Effect |
|---------|--------|
| `help` | List commands |
| `ls`, `ls projects`, `ls skills` | List "files", every project, or a skills summary |
| `cd <dir>` | Navigate: `projects`, `skills`, `library`, `contact`, `~`, or a project like `cd projects/notino` |
| `cat stack.txt`, `cat about.txt` | Print a "file" |
| `./contact.sh` | Open the contact page |
| `whoami`, `uname`, `pwd`, `date`, `echo`, `history`, `clear` | The usual suspects |
| Tab, ↑ / ↓, Ctrl+L, Ctrl+C | Completion, history, clear, cancel |

Unknown input answers `bash: <cmd>: command not found`. A few easter eggs are hidden in the `run()` switch;
add your own there.

### Slimes

`components/Slimes.tsx` puts a few pixel slimes on the page itself. They stand on the top edges of cards, buttons,
headings and images, hop between them, drop off edges, and ride along with the page as you scroll. Slimes left
behind off-screen drop in from the top onto whatever is visible.

They watch the cursor and hop away when it gets too close. Clicking one (anywhere that isn't a link or button) sends
it flying with a "boing!". The canvas never blocks clicks, sits below the header, pauses in background tabs, and draws
nothing when the visitor prefers reduced motion.

Which elements count as platforms is `PLATFORM_SELECTOR`; sprites and colours are text grids at the top of the file.

## Run locally

Requires Node 22 (same as CI).

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static site in ./out
npx serve out    # preview the production build
```

To preview the production build under a sub-path, as GitHub Pages serves it:

```bash
NEXT_PUBLIC_BASE_PATH=/PersonalPortfolioNext npm run build
```

## Project structure

```
app/                    Routes (App Router), global styles, bundled fonts
  globals.css           Design tokens and reusable utility classes
  layout.tsx            Fonts, header/footer, build-time content validation
  page.tsx              Home
  projects/             Project list + [slug] detail pages (statically generated)
  skills/ library/ contact/
components/             UI components (client components are marked 'use client')
content/                All site content, typed. Edit these to change the site
lib/
  asset.ts              Prefixes /public paths with the base path
  skills.ts             Skill levels, sorted skill list, "used in" project lookup
  validate-content.ts   Fails the build on missing images or duplicate slugs
public/
  icons/                Technology icons (<Key>.png, or .svg set explicitly)
  logos/                Project icons
  projects/<slug>/      Project screenshots (webp)
  books/                Book covers (webp)
```

## Editing content

| File | What it holds |
|------|---------------|
| `content/profile.ts` | Name, role, about text, stats, experience, education, socials, navigation, contact form endpoint |
| `content/projects.ts` | Projects. Order in the file is the order on the site |
| `content/tech.ts` | Every technology. Entries with `proficiency` appear on the Skills page |
| `content/books.ts` | Personal library |
| `content/types.ts` | Types for all of the above, plus the list of skill categories |

### Add a project

1. Put screenshots in `public/projects/<slug>/`: webp, max ~1600px wide.
   The **first image is the card cover**, cropped to 16:10 from the top, so pick one that crops well.
2. Append an object to `content/projects.ts`. `client`, `featured`, `icon`, `images` and `videoUrl` are optional.
3. `featured: true` also shows it on the home page.

A page is generated automatically at `/projects/<slug>/`. List technologies in `tech` by their key from
`content/tech.ts`; they appear as clickable badges, and the project shows up under "Used in" in each technology's
popover.

### Add a technology

Add an entry to `content/tech.ts`. The object key is used everywhere else (project `tech` lists), and a typo fails
the build.

```ts
Redis: {
    name: 'Redis',                          // display name
    categories: ['Storage'],                // first one decides the section on the Skills page
    proficiency: 'Expert',                  // omit to use it only as a project badge
    description: 'In-memory data store…'    // shown in the popover
},
```

- **Icon.** Defaults to `public/icons/<Key>.png`. For an SVG or a different file, set `icon: '/icons/Name.svg'`. For
  no icon, set `icon: null`: a two-letter monogram is shown instead. Icons sit on a light plate, so dark logos stay
  visible. [devicon](https://devicon.dev) and [simple-icons](https://simpleicons.org) are good SVG sources.
- **Levels** (defined in `lib/skills.ts`):
  - **Expert**: daily driver, used in production.
  - **Advanced**: shipped real projects with it.
  - **Basic**: learned and experimented.
- **Categories** are listed in `SKILL_CATEGORIES` in `content/types.ts`. A technology can have several: it is
  counted under each in the filters, but in the "All" view it appears once, under its first category.

### Add a book

Put a cover at `public/books/<slug>.webp` (~400px wide) and append to `content/books.ts`. `summary` and `takeaways`
appear in the popover. A new `category` needs adding to `BookCategory` in `content/types.ts` and becomes a new shelf.

### Safety net

`npm run build` fails if any image referenced in `content/` is missing from `public/`, or if two projects share a
slug (`lib/validate-content.ts`, run from `app/layout.tsx`).

## Design

The theme is **dark retro**: warm near-black background, cream text, amber / teal / coral accents, hard offset
shadows, square corners and faint static CRT scanlines. The site is intentionally dark-only.

- **Tokens:** the colours are CSS variables at the top of `app/globals.css`, exposed to Tailwind as `bg`, `surface`,
  `surface-2`, `border`, `text`, `muted`, `accent`, `teal`, `coral`, `plate`. Components only use these names.
  Tailwind radius tokens are also overridden there to keep corners square.
- **Utilities** (also in `globals.css`):

  | Utility | Use |
  |---------|-----|
  | `container-page` | Page-width container |
  | `card`, `card-hover` | Bordered panel with hard shadow; lift on hover |
  | `btn-primary`, `btn-ghost` | Buttons with press effect |
  | `chip` | Small mono tag |
  | `eyebrow` | `> SECTION LABEL` above headings |
  | `pixel` | Pixel display font, used for headings |
  | `cursor` | Appends a blinking `_` |
  | `retro-shadow` | 4px offset black shadow |

- **Fonts:** Geist (body), Geist Mono (labels, chips) and VT323 (pixel headings). All are bundled as woff2 in
  `app/fonts/`, so the build needs no network access.
- **Motion:** everything respects `prefers-reduced-motion`.

## Components

| Component | Purpose |
|-----------|---------|
| `Slimes` | Pixel slimes that hop around on cards, buttons and headings; click one for a boing |
| `InfoPopover` | Click-to-open info card on the native Popover API: one open at a time; closes on Esc, outside click, × or the trigger. Anchored to the trigger on desktop, a bottom sheet on phones. No backdrop, no scroll lock |
| `TechBadge` | `TechBadge` (project pill), `SkillTile` (skills grid tile), `TechIcon`, `LevelBars`, all opening a tech popover with description and "Used in" |
| `SkillsExplorer` | Skills page: level, category and search filters with live counts, grouped sections, level legend |
| `LibraryGrid`, `BookCover` | Book shelves and clickable covers |
| `ProjectsBrowser`, `ProjectCard` | Project grid with category filter |
| `Gallery` | Screenshot carousel with thumbnails, arrow keys and swipe |
| `Terminal` | Home page interactive bash prompt; commands live in its `run()` function |
| `FilterChips` | Toggle-chip group with optional counts |
| `ContactForm` | Formspree form with sending / sent / error states |
| `SiteHeader`, `SiteFooter`, `PageHeader`, `SectionHeading` | Layout pieces |

Images use plain `<img>` with `asset()` so they resolve under the base path; `next/image` optimisation is off for
the static export.

## Deploy

`.github/workflows/deploy.yml` lints, builds and deploys to GitHub Pages on push to `main` (enable
*Settings → Pages → Source: GitHub Actions*). It sets `NEXT_PUBLIC_BASE_PATH=/<repo>` so assets resolve under
`https://kot-1999.github.io/<repo>/`. For a custom domain or a `<user>.github.io` repo, remove that variable.

Any static host (Vercel, Netlify, Cloudflare Pages) works too: just serve `out/`.

## Credits

Commercial project screenshots (Notino, Aivodot, KIA, Benzinol) are from GoodRequest's public case studies, linked on
each project page.
