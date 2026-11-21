/**
 * Central site configuration.
 *
 * Values that differ per environment (or are not yet known) are read from Vite
 * environment variables, so no placeholder contact details are ever shipped.
 * See `.env.example` and the README for the full list.
 */

const env = import.meta.env

function clean(value: string | undefined): string {
  return (value ?? '').trim()
}

const siteUrl = clean(env.VITE_SITE_URL).replace(/\/+$/, '') || 'https://syntekra.com'

export const site = {
  name: 'Syntekra',
  tagline: 'Engineering Tomorrow Together',
  url: siteUrl,
  description:
    'Syntekra designs and builds custom software, AI agents, business process automation and system integrations for companies that need technology to fit the way they operate.',

  contact: {
    /** Public contact email. When empty, no email link is rendered. */
    email: clean(env.VITE_CONTACT_EMAIL),
    /**
     * Endpoint that receives the contact form as a JSON POST
     * (e.g. a future ASP.NET Core API route or a form service).
     * When empty, the form is not rendered.
     */
    formEndpoint: clean(env.VITE_CONTACT_FORM_ENDPOINT),
  },

  /**
   * Client portal link (app.syntekra.com). Disabled until the application is live.
   * Enable with VITE_CLIENT_PORTAL_ENABLED=true.
   */
  clientPortal: {
    enabled: clean(env.VITE_CLIENT_PORTAL_ENABLED) === 'true',
    url: clean(env.VITE_CLIENT_PORTAL_URL) || 'https://app.syntekra.com',
    label: 'Client login',
  },
} as const

export interface NavItem {
  label: string
  href: string
}

export const primaryNav: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Approach', href: '#approach' },
  { label: 'About', href: '#about' },
]

export const contactHref = '#contact'
