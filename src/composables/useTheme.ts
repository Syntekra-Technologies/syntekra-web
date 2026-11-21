import { onBeforeUnmount, onMounted, readonly, ref } from 'vue'

/**
 * Theme handling.
 *
 * The initial theme is applied by an inline script in index.html before first
 * paint (no flash of the wrong theme). This composable only syncs with that
 * state after mount, persists explicit choices, and follows the system
 * preference for as long as the visitor has not made one.
 *
 * Keep STORAGE_KEY in sync with the inline script in index.html.
 */

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'syntekra-theme'

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function useTheme() {
  const theme = ref<Theme>('light')
  const mounted = ref(false)
  let media: MediaQueryList | null = null

  const onSystemChange = (event: MediaQueryListEvent) => {
    if (readStoredTheme()) return
    theme.value = event.matches ? 'dark' : 'light'
    applyTheme(theme.value)
  }

  onMounted(() => {
    theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', onSystemChange)
    mounted.value = true
  })

  onBeforeUnmount(() => {
    media?.removeEventListener('change', onSystemChange)
  })

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(theme.value)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme.value)
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); the toggle still works.
    }
  }

  return { theme: readonly(theme), mounted: readonly(mounted), toggleTheme }
}
