import { darkTheme, lightTheme } from './theme'

// 👇 on déclare un type commun aux deux thèmes
type Theme = typeof darkTheme | typeof lightTheme

let current: Theme = lightTheme

export function setTheme(mode: 'light' | 'dark') {
  current = mode === 'light' ? lightTheme : darkTheme
}

export function useTheme() {
  return {
    ...current,
    colors: current.colors,
  }
}
