import { ThemeProvider, DefaultTheme } from '@react-navigation/native'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  const WhiteTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
      card: '#ffffff',
      text: '#000000',
      border: '#e0e0e0',
      primary: '#000000',
    },
  }

  return (
    <ThemeProvider value={WhiteTheme}>
      <Slot />
      <StatusBar style="dark" />
    </ThemeProvider>
  )
}
