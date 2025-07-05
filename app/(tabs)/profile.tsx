import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { getUserData, getFlowsByUser, getWorkoutHistory } from '@/lib/firebaseHelpers'
import Header from '@/components/Header'

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      const storedUser = JSON.parse(await AsyncStorage.getItem('user'))
      const userData = await getUserData(storedUser.id)
      const flows = await getFlowsByUser(storedUser.id)
      const history = await getWorkoutHistory(storedUser.id)

      const totalDuration = history.reduce((acc, session) => acc + session.duration, 0)
      const allExercises = flows.flatMap(f => f.exercises || [])

      setUser(userData)
      setStats({
        memberSince: new Date(userData.createdAt).toLocaleDateString(),
        flowCount: flows.length,
        workoutCount: history.length,
        totalMinutes: Math.round(totalDuration / 60),
        totalExercises: allExercises.length,
      })
    }

    fetchProfile()
  }, [])

  const logout = async () => {
    await AsyncStorage.clear()
    router.replace('/login')
  }

  return (
    <SafeAreaView style={styles.page}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={
              user?.profilePicture
                ? { uri: user.profilePicture }
                : require('@/assets/images/defaultavatar.png')
            }
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.name || 'Utilisateur'}</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📊 Statistiques</Text>
          {stats ? (
            <View style={styles.statsList}>
              <Text style={styles.statItem}>👤 Membre depuis : {stats.memberSince}</Text>
              <Text style={styles.statItem}>📁 Flows créés : {stats.flowCount}</Text>
              <Text style={styles.statItem}>🔥 Séances réalisées : {stats.workoutCount}</Text>
              <Text style={styles.statItem}>⏱️ Temps total : {stats.totalMinutes} min</Text>
              <Text style={styles.statItem}>🏋️ Exercices utilisés : {stats.totalExercises}</Text>
            </View>
          ) : (
            <Text style={styles.loading}>Chargement des statistiques...</Text>
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => router.push('/edit-profile')}
            style={[styles.button, styles.editButton]}
          >
            <Text style={styles.buttonText}>✏️ Modifier le profil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={[styles.button, styles.logoutButton]}>
            <Text style={styles.buttonText}>🚪 Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#444',
  },
  statsList: {
    gap: 6,
  },
  statItem: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },
  loading: {
    color: '#999',
    fontStyle: 'italic',
  },
  buttonsContainer: {
    gap: 14,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007bff',
  },
  logoutButton: {
    backgroundColor: '#e63946',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
