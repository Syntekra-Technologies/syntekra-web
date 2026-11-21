import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'

/** Used at build time only, by scripts/prerender.mjs, to produce static HTML. */
export async function render(): Promise<string> {
  const app = createSSRApp(App)
  return renderToString(app)
}
