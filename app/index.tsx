import { radius, spacing, typography } from '@/lib/theme'
import { useTheme } from '@/lib/useTheme'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HomeScreen() {
  const router = useRouter()
  const { colors } = useTheme()

  // ✅ Rediriger si déjà connecté
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user')
      if (user) {
        router.replace('/(tabs)' as any)
      }
    }

    checkUser()
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        padding: spacing.lg,
      }}
    >
      {/* Logo */}
      <Image
        source={require('../assets/images/flowgym-logo.png')}
        style={{
          width: 480,
          height: 160,
          resizeMode: 'contain',
          marginTop: spacing.xl,
        }}
      />

      {/* Title */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: colors.text,
            textAlign: 'center',
          }}
        >
          Welcome
        </Text>
      </View>

      {/* Buttons */}
      <View
        style={{ width: '100%', gap: spacing.md, marginBottom: spacing.xl }}
      >
        <TouchableOpacity
          onPress={() => router.push('/register' as any)}
          style={{
            paddingVertical: spacing.md,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: colors.text,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: typography.body.fontSize,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/login' as any)}
          style={{
            paddingVertical: spacing.md,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: colors.text,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: typography.body.fontSize,
            }}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
