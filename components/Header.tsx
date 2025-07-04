// components/Header.tsx
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function Header() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>FlowGym</Text>
      <TouchableOpacity>
        <Ionicons name="person-circle-outline" size={32} color="#000" />
      </TouchableOpacity>
    </View>
  )
}
