import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFlowsByUser, getExercisesByUser } from '@/lib/firebaseHelpers'

export default function MyFlowsScreen() {
  const [flows, setFlows] = useState<any[]>([])
  const [exercises, setExercises] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(await AsyncStorage.getItem('user'))
      if (!storedUser?.id) return

      // Flows créés par l'utilisateur
      const userFlows = await getFlowsByUser(storedUser.id)
      setFlows(userFlows)

      // Exercices personnalisés de l'utilisateur (hors flows)
      const userExercises = await getExercisesByUser(storedUser.id)
      setExercises(userExercises)
    }

    fetchData()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>🧩 Séances complètes</Text>
        {flows.length === 0 ? (
          <Text style={styles.empty}>Aucune séance trouvée.</Text>
        ) : (
          flows.map(flow => (
            <TouchableOpacity
              key={flow.id}
              style={styles.item}
              onPress={() => router.push(`/flow/${flow.id}`)}
            >
              <Text style={styles.itemTitle}>{flow.name}</Text>
              <Text style={styles.itemSubtitle}>
                {flow.exercises?.length || 0} exercices
              </Text>
            </TouchableOpacity>
          ))
        )}

        <Text style={styles.sectionTitle}>🏋️ Exercices individuels</Text>
        {exercises.length === 0 ? (
          <Text style={styles.empty}>Aucun exercice disponible.</Text>
        ) : (
          exercises.map((exercise, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.item}
              onPress={() => router.push(`/exercise/${exercise.id}`)}
            >
              <Text style={styles.itemTitle}>{exercise.name}</Text>
              <Text style={styles.itemSubtitle}>
                Catégorie : {exercise.category || 'Personnalisé'}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    color: '#111',
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  empty: {
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 16,
  },
})
