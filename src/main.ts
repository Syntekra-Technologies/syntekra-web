import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

// Production builds are prerendered (see scripts/prerender.mjs), so hydrate the
// existing markup when it is present. In development the container is empty.
const container = document.getElementById('app')!
const app = container.hasChildNodes() ? createSSRApp(App) : createApp(App)

app.mount(container)
