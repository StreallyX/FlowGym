import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, usePathname } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const isProfilePage = pathname === '/profile'

  const handleIconPress = () => {
    if (isProfilePage) {
      router.push('/settings')
    } else {
      router.push('/profile')
    }
  }

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: '#fff' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#222' }}>FlowGym</Text>
        <TouchableOpacity onPress={handleIconPress}>
          <Ionicons
            name={isProfilePage ? 'settings-outline' : 'person-circle-outline'}
            size={32}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
