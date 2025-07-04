import { radius, spacing, typography } from '@/lib/theme'
import { useTheme } from '@/lib/useTheme'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function HomeScreen() {
  const router = useRouter()
  const { colors } = useTheme()

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
          width: 480,           // double the original width
          height: 160,           // double the original height
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
      <View style={{ width: '100%', gap: spacing.md, marginBottom: spacing.xl }}>
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/register' as any})}
          style={{
            paddingVertical: spacing.md,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: colors.text,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.text, fontSize: typography.body.fontSize }}>
            Sign Up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push({ pathname: '/login' as any})}
          style={{
            paddingVertical: spacing.md,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: colors.text,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.text, fontSize: typography.body.fontSize }}>
            Log In
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}
