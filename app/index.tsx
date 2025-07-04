import React from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { spacing } from '@/lib/theme'
import { useTheme } from '@/lib/useTheme'

export default function HomeScreen() {
  const { colors } = useTheme()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.md,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.primary ?? '#2563eb', // fallback blue-600
          }}
        >
          Bienvenue sur FlowGym 🏋️
        </Text>
      </View>
    </SafeAreaView>
  )
}
