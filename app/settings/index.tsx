import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SettingsScreen() {
  const router = useRouter()

  const handleLogout = async () => {
    await AsyncStorage.clear()
    router.replace('/login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/profile')}>
        <Text style={styles.itemText}>Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/notifications')}>
        <Text style={styles.itemText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/camera')}>
        <Text style={styles.itemText}>Caméra</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/language')}>
        <Text style={styles.itemText}>Langue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/about')}>
        <Text style={styles.itemText}>À propos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222',
  },
  item: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#e63946',
    paddingVertical: 14,
    borderRadius: 12,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
