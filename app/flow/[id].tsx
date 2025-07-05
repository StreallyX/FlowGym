import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function FlowDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()

  const [flow, setFlow] = useState<any>(null)
  const [detailedExercises, setDetailedExercises] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFlowAndExercises = async () => {
      try {
        const flowId = Array.isArray(id) ? id[0] : id
        if (!flowId) return

        const flowSnap = await getDoc(doc(db, 'flows', flowId))
        if (!flowSnap.exists()) return

        const flowData = { id: flowSnap.id, ...flowSnap.data() }
        setFlow(flowData)

        const detailed = await Promise.all(
          (flowData.exercises || []).map(async (item: any) => {
            if (!item.exerciseId) return null
            const exSnap = await getDoc(doc(db, 'exercises', item.exerciseId))
            if (exSnap.exists()) {
              return {
                ...exSnap.data(),
                id: exSnap.id,
                restTime: item.restTime || '0',
              }
            }
            return null
          })
        )

        setDetailedExercises(detailed.filter(Boolean)) // remove nulls
      } catch (err) {
        console.error('Erreur lors du chargement du flow :', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFlowAndExercises()
  }, [id])

  if (loading || !flow) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{flow.name}</Text>
      <Text style={styles.subtitle}>
        {detailedExercises.length} exercice(s)
      </Text>

      {detailedExercises.map((exercise, index) => (
        <View key={exercise.id + index} style={styles.exerciseCard}>
          <Text style={styles.exerciseName}>• {exercise.name}</Text>
          <Text style={styles.exerciseInfo}>Séries : {exercise.sets}</Text>
          <Text style={styles.exerciseInfo}>Répétitions : {exercise.reps}</Text>
          <Text style={styles.exerciseInfo}>Poids : {exercise.weight} kg</Text>
          <Text style={styles.exerciseInfo}>
            Repos après : {exercise.restTime}s
          </Text>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => router.push({ pathname: '/session', params: { flowId: flow.id } })}
        style={styles.startButton}
      >
        <Text style={styles.startButtonText}>✅ START</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#777',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  exerciseCard: {
    backgroundColor: '#f1f1f1',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
  },
  exerciseInfo: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
  startButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
