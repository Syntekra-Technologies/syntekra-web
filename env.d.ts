/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical origin, without trailing slash. Defaults to https://syntekra.com */
  readonly VITE_SITE_URL?: string
  /** Public contact email address shown in the contact section. */
  readonly VITE_CONTACT_EMAIL?: string
  /** URL that accepts the contact form as a JSON POST request. */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string
  /** Set to "true" to show the client portal link in the navigation. */
  readonly VITE_CLIENT_PORTAL_ENABLED?: string
  /** Client portal URL. Defaults to https://app.syntekra.com */
  readonly VITE_CLIENT_PORTAL_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
