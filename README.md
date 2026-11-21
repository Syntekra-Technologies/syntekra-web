# Syntekra — Public Website

The official public website for **Syntekra**, a technology company specializing in custom software development, AI agents, business process automation, and system integration.

Built with **Vue 3, TypeScript, Vite, and Tailwind CSS v4**, with static HTML prerendering for fast loading, SEO, and efficient deployment.

## Technology Stack

- **Vue 3** — Frontend framework
- **TypeScript** — Type-safe development
- **Vite** — Development server and build tooling
- **Tailwind CSS v4** — Styling and design system
- **Vue Server Renderer** — Build-time static HTML generation
- **Oxlint, ESLint, and Prettier** — Code quality and formatting

## Getting Started

### Prerequisites

- Node.js (a version compatible with the project's dependencies)
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Syntekra-Technologies/syntekra-web.git
cd syntekra-web
npm install
```

Start the development server:

```bash
npm run dev
```

### Available Commands

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check, build, and prerender the website |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint and ESLint |
| `npm run format` | Format source files with Prettier |

## Configuration

The website uses Vite environment variables for deployment configuration.

Refer to [`.env.example`](.env.example) for available settings.

**Security:** All variables prefixed with `VITE_` are embedded into the public JavaScript bundle. Never store API keys, passwords, access tokens, or other secrets in these variables.

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_SITE_URL` | Canonical origin used for SEO, sitemap, and robots.txt | `https://syntekra.com` |
| `VITE_CONTACT_EMAIL` | Public contact email displayed on the website | Empty |
| `VITE_CONTACT_FORM_ENDPOINT` | Endpoint receiving contact form submissions | Empty |
| `VITE_CLIENT_PORTAL_ENABLED` | Enables the client login link when set to `true` | `false` |
| `VITE_CLIENT_PORTAL_URL` | URL of the future client portal | `https://app.syntekra.com` |

### Contact Configuration

At least one contact method must be configured before launching the website.

If neither `VITE_CONTACT_EMAIL` nor `VITE_CONTACT_FORM_ENDPOINT` is configured:

- The contact section displays informational content only.
- A development warning appears when running `npm run dev`.
- A warning is printed during the production build.

### Contact Form API

When `VITE_CONTACT_FORM_ENDPOINT` is configured, the contact form submits a JSON request.

**Method:** `POST`  
**Content-Type:** `application/json`

Example payload:

```json
{
  "name": "",
  "email": "",
  "company": "",
  "topic": "",
  "message": ""
}
```

The form interprets any `2xx` HTTP response as successful. Other responses display an error message, with the configured email address available as a fallback.

The receiving endpoint is responsible for:

- Server-side input validation
- Rate limiting
- Spam protection
- Email delivery or message storage
- Appropriate security controls

The frontend also includes a hidden honeypot field (`website`), which is not submitted to the endpoint.

The contact endpoint can be implemented using **ASP.NET Core Web API** or an external form service.

For a separately hosted API, configure CORS to permit requests from the website's origin.

## Build and Deployment

The website is prerendered into static HTML during the production build.

Run:

```bash
npm run build
```

### Build Process

The production build consists of three stages:

1. **Client build:** `vite build` generates optimized frontend assets with hashed filenames.
2. **Server build:** `vite build --ssr src/entry-server.ts` generates a temporary server-side rendering bundle.
3. **Static prerendering:** `scripts/prerender.mjs` renders the Vue application into HTML and generates the required SEO files.

The prerendering process:

- Injects rendered HTML into `dist/index.html`
- Adds font preload hints
- Generates `robots.txt`
- Generates `sitemap.xml`

The resulting `dist/` directory contains the complete static website.

**No Node.js server is required in production.**

### Hosting

The website can be deployed to any static hosting provider or CDN, including:

- Cloudflare Workers Static Assets
- Cloudflare Pages
- GitHub Pages
- Other static hosting services

For Cloudflare Workers, the deployment configuration should point to the `dist/` directory.

### Recommended Cache Headers

| Asset | Cache-Control |
|---|---|
| `/assets/*` | `public, max-age=31536000, immutable` |
| `/index.html` | `no-cache` |

Long-term caching is appropriate for generated assets with content-hashed filenames.

## Project Structure

```text
syntekra-web/
├── public/
│   ├── favicon
│   ├── touch icon
│   └── Open Graph image
│
├── scripts/
│   └── prerender.mjs
│
├── src/
│   ├── assets/
│   │   ├── main.css
│   │   ├── fonts/
│   │   └── logos/
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── contact/
│   │   ├── ui/
│   │   └── visuals/
│   │
│   ├── composables/
│   │   └── useTheme
│   │
│   ├── config/
│   │   └── site.ts
│   │
│   ├── content/
│   ├── entry-server.ts
│   └── main.ts
│
├── .env.example
├── package.json
├── vite.config.ts
└── README.md
```

### Directory Responsibilities

| Directory | Purpose |
|---|---|
| `src/assets/` | Global styles, fonts, and official branding |
| `src/components/layout/` | Header, footer, and navigation |
| `src/components/sections/` | Individual landing-page sections |
| `src/components/contact/` | Contact form components |
| `src/components/ui/` | Reusable interface primitives |
| `src/components/visuals/` | Custom diagrams and visual elements |
| `src/composables/` | Reusable Vue composition logic |
| `src/config/` | Centralized site configuration |
| `src/content/` | Shared website content |
| `scripts/` | Build-time prerendering utilities |
| `public/` | Public static assets |

## Design System

The website follows Syntekra's visual identity, emphasizing precision, clarity, and professional software engineering.

### Brand Colors

The final palette is derived from the official Syntekra SVG logo assets.

| Color | Hex | Usage |
|---|---|---|
| Brand Blue | `#1162FE` | Primary brand accent |
| Electric Cyan | `#00C8FC` | Secondary accents |
| Deep Blue | `#03328E` | Brand gradient and supporting details |
| Navy | `#03112C` | Wordmark and dark surfaces |

Semantic design tokens such as `canvas`, `surface`, `ink`, `body`, `muted`, `line`, and `accent` provide consistent styling across light and dark themes.

### Typography

- **Space Grotesk** — Headings and display typography
- **Inter** — Body text, navigation, and interface elements

Both fonts are self-hosted as variable fonts using Latin subsets under the SIL Open Font License.

Uppercase typography is primarily reserved for small functional labels.

### Geometry

The website's geometric details are inspired by the official Syntekra symbol.

The recurring isometric markers, hero diagram, contact lattice, and chamfered contact panel use the symbol's edge slope:

`69 / 126.65 ≈ 28.6°`

This establishes a consistent visual relationship between the logo and the website.

### Light and Dark Themes

The website supports both light and dark modes.

- The system color preference is used by default.
- Users can manually switch themes.
- Explicit preferences are stored in `localStorage` under `syntekra-theme`.
- An inline script applies the selected theme before the first render to prevent theme flashing.
- The `.on-dark` utility applies dark-mode design tokens to sections that must always remain dark.

### Logo Usage

Always use the `SiteLogo.vue` component when displaying the Syntekra logo.

The component uses the supplied SVG files without modifying their geometry or colors.

- **Light backgrounds:** Navy wordmark
- **Dark backgrounds:** White wordmark

## Client Portal Integration

The public website is prepared for a future authenticated client portal.

To enable its login link, configure:

```env
VITE_CLIENT_PORTAL_ENABLED=true
VITE_CLIENT_PORTAL_URL=https://app.syntekra.com
```

Once enabled, the client login link appears in the desktop navigation, mobile menu, and footer.

No additional frontend code changes are required.

## License and Copyright

Copyright © 2026 Syntekra. All rights reserved.

This repository is publicly accessible but is **not distributed under an open-source software license**.

Unless otherwise permitted by applicable law or the relevant rights holder, copying, modifying, redistributing, or commercially reusing proprietary Syntekra source code and branding requires prior written authorization.

The Syntekra name, logos, and visual identity are proprietary branding assets and are not offered for unrestricted reuse.

Third-party software, libraries, and fonts retain their respective licenses.

Public visibility of this repository does not grant additional intellectual property rights.