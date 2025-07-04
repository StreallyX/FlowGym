// app/(tabs)/index.tsx
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const router = useRouter()

  const myFlows = ['Pull Day', 'Leg Day']
  const friendFlows = [
    { name: 'Jake', flow: 'Push Day', time: '5h ago' },
    { name: 'Sarah', flow: 'Full Body', time: '1d ago' },
  ]

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <Header />

      {/* MY FLOWS */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>MY FLOWS</Text>
      {myFlows.length > 0 ? (
        <View style={{ borderWidth: 1, borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
          {myFlows.map((flow, index) => (
            <View
              key={index}
              style={{
                padding: 12,
                borderBottomWidth: index !== myFlows.length - 1 ? 1 : 0,
                borderColor: '#ddd',
              }}
            >
              <Text>{flow}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={{ marginBottom: 12 }}>
          You have no flows. Start by creating one!
        </Text>
      )}

      <TouchableOpacity
        onPress={() => router.push('/(tabs)/new-flow')}
        style={{
          backgroundColor: '#2563EB',
          padding: 12,
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          + New Flow
        </Text>
      </TouchableOpacity>

      {/* FRIEND FLOWS */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>FRIEND FLOWS</Text>
      {friendFlows.length > 0 ? (
        friendFlows.map((friend, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            <Ionicons name="person-circle-outline" size={28} style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{friend.name}</Text>
              <Text style={{ color: '#777' }}>{friend.flow}</Text>
            </View>
            <Text style={{ color: '#999', fontSize: 12 }}>{friend.time}</Text>
          </View>
        ))
      ) : (
        <Text>You have no friends yet. Add some to see their flows!</Text>
      )}
    </ScrollView>
  )
}
