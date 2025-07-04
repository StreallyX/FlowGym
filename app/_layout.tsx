import { ThemeProvider, DefaultTheme } from '@react-navigation/native'
import { Slot, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const segments = useSegments()
  const router = useRouter()

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

  // 👇 Vérifie la session au démarrage
  useEffect(() => {
    const checkSession = async () => {
      const user = await AsyncStorage.getItem('user')
      setIsAuthenticated(!!user)
      setIsReady(true)
    }
    checkSession()
  }, [])

  // 👇 Redirection automatique si connecté/déconnecté
  useEffect(() => {
    if (!isReady) return

    const inAuthScreen = segments[0] === 'login' || segments[0] === 'register'

    if (isAuthenticated && inAuthScreen) {
      router.replace('/(tabs)' as any)
    } else if (!isAuthenticated && !inAuthScreen) {
      router.replace('/login')
    }
  }, [segments, isAuthenticated, isReady])


  if (!isReady) return null // éviter le rendu avant vérification

  return (
    <ThemeProvider value={WhiteTheme}>
      <Slot />
      <StatusBar style="dark" />
    </ThemeProvider>
  )
}
