# Syntekra — public website

The public marketing site for Syntekra (custom software, AI agents, process automation and system
integration). Built with Vue 3, TypeScript, Vite and Tailwind CSS v4, and prerendered to static HTML
at build time.

## Commands

```sh
npm install
npm run dev        # development server
npm run build      # type-check + production build + static prerender -> dist/
npm run preview    # serve dist/ locally
npm run lint       # oxlint + eslint
npm run format     # prettier
```

## Configuration (required before launch)

All configuration is done with Vite environment variables. Values are embedded into the public
bundle, so **never put secrets here**. See [`.env.example`](.env.example).

| Variable                     | Purpose                                                              | Default                    |
| ---------------------------- | -------------------------------------------------------------------- | -------------------------- |
| `VITE_SITE_URL`              | Canonical origin for canonical URL, Open Graph, sitemap, robots.txt  | `https://syntekra.com`     |
| `VITE_CONTACT_EMAIL`         | Public contact email (contact section + footer). Hidden when empty.  | _empty_                    |
| `VITE_CONTACT_FORM_ENDPOINT` | URL that receives the contact form as JSON POST. Hidden when empty.  | _empty_                    |
| `VITE_CLIENT_PORTAL_ENABLED` | `true` shows the "Client login" link in header, mobile menu, footer  | `false`                    |
| `VITE_CLIENT_PORTAL_URL`     | Client portal URL                                                    | `https://app.syntekra.com` |

**At least one contact channel must be configured before deploying.** Without one, the contact
section shows only its copy. A development-only notice appears in `npm run dev`, and the build
prints a warning.

### Contact form contract

When `VITE_CONTACT_FORM_ENDPOINT` is set, the form sends:

```http
POST <endpoint>
Content-Type: application/json

{ "name": "", "email": "", "company": "", "topic": "", "message": "" }
```

Any `2xx` response is shown as success; anything else shows an error (with the email address as
a fallback when configured). The endpoint is responsible for validation, rate limiting, spam
protection and delivery. It can be a future ASP.NET Core Web API route (enable CORS for the site
origin) or a hosted form service. The form also includes a hidden honeypot field (`website`) that
is never sent.

## Prerendering and deployment

`npm run build` performs three steps:

1. `vite build` — client bundle with hashed asset names (safe for long-term caching).
2. `vite build --ssr src/entry-server.ts` — a temporary server bundle.
3. `scripts/prerender.mjs` — renders the page to HTML with `vue/server-renderer`, injects it into
   `dist/index.html`, adds font preload hints, and writes `robots.txt` and `sitemap.xml`.

The output in `dist/` is fully static; host it on any static host or CDN. No Node.js server is
needed. Recommended cache headers: `Cache-Control: public, max-age=31536000, immutable` for
`/assets/*`, and `no-cache` for `index.html`.

## Project structure

```
src/
  assets/
    main.css          design tokens (Tailwind v4 @theme), theme variables, base styles
    fonts/            self-hosted Inter + Space Grotesk variable fonts (Latin subset, SIL OFL)
    logos/            official Syntekra logo files (do not modify)
  components/
    layout/           SiteHeader (incl. mobile menu), SiteFooter
    sections/         one component per page section
    contact/          ContactForm
    ui/               small reusable primitives (ButtonLink, SectionLabel, SiteLogo, ThemeToggle…)
    visuals/          SystemsDiagram (hero), FlowLine
  composables/        useTheme
  config/site.ts      site-wide configuration, navigation, contact/portal settings
  content/            shared copy (services)
  entry-server.ts     build-time render entry used by the prerender script
  main.ts             client entry (hydrates the prerendered HTML)
public/               favicon, touch icon, Open Graph image
scripts/prerender.mjs
```

## Design system notes

- **Colors** come from the official logo files and override the initial brief palette where they
  differ: brand blue `#1162FE`, cyan `#00C8FC` (used sparingly), deep blue `#03328E`, and navy
  `#03112C` (wordmark ink). Semantic tokens (`canvas`, `surface`, `ink`, `body`, `muted`, `line`,
  `accent`) switch automatically between light and dark mode. `.on-dark` forces the dark token set
  for always-dark panels.
- **Geometry**: the recurring isometric marker, the hero diagram, the contact lattice and the
  chamfered contact panel all use the exact edge slope of the Syntekra symbol (69 / 126.65 ≈ 28.6°).
- **Typography**: Space Grotesk for headings, Inter for everything else. Uppercase is reserved for
  small functional labels (`.label`).
- **Theme**: the system preference is the default. The toggle persists an explicit choice in
  `localStorage` (`syntekra-theme`). An inline script in `index.html` applies the theme before
  first paint, so the wrong theme never flashes.
- **Logo**: always use `SiteLogo.vue`, which renders the supplied SVGs unmodified (navy wordmark
  on light backgrounds, white wordmark on dark ones).

## Adding the client login later

Set `VITE_CLIENT_PORTAL_ENABLED=true` (and `VITE_CLIENT_PORTAL_URL` if it differs). The link then
appears in the desktop header, mobile menu and footer. No code changes are needed.
