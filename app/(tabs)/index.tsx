import { View, Text, SafeAreaView } from 'react-native'
import { useTheme } from '@/lib/useTheme'

export default function Home() {
  const { colors } = useTheme()

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text, fontSize: 24 }}>🏠 Welcome to FlowGym</Text>
    </SafeAreaView>
  )
}
