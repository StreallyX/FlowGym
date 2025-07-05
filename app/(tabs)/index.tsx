import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
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
    <SafeAreaView style={styles.page}>
      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        {/* MY FLOWS */}
        <Text style={styles.sectionTitle}>MY FLOWS</Text>
        {myFlows.length > 0 ? (
          <View style={styles.flowCard}>
            {myFlows.map((flow, index) => (
              <View
                key={index}
                style={[
                  styles.flowItem,
                  index !== myFlows.length - 1 && styles.flowItemBorder,
                ]}
              >
                <Text>{flow}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>You have no flows. Start by creating one!</Text>
        )}

        <TouchableOpacity
          onPress={() => router.push('/(tabs)/new-flow')}
          style={styles.newFlowButton}
        >
          <Text style={styles.newFlowButtonText}>+ New Flow</Text>
        </TouchableOpacity>

        {/* FRIEND FLOWS */}
        <Text style={styles.sectionTitle}>FRIEND FLOWS</Text>
        {friendFlows.length > 0 ? (
          friendFlows.map((friend, idx) => (
            <View key={idx} style={styles.friendFlow}>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flowCard: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    borderColor: '#ccc',
  },
  flowItem: {
    padding: 12,
  },
  flowItemBorder: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  emptyText: {
    marginBottom: 12,
  },
  newFlowButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  newFlowButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  friendFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
})
