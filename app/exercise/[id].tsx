import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [exercise, setExercise] = useState<any>(null)

  useEffect(() => {
    const fetchExercise = async () => {
      const exerciseId = Array.isArray(id) ? id[0] : id
      if (!exerciseId) return

      try {
        const snap = await getDoc(doc(db, 'exercises', exerciseId))
        if (snap.exists()) {
          setExercise({ id: snap.id, ...snap.data() })
        } else {
          console.warn('Exercice non trouvé.')
        }
      } catch (err) {
        console.error('Erreur lors du chargement de l’exercice :', err)
      }
    }

    fetchExercise()
  }, [id])

  if (!exercise) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {exercise.imageUrl && (
        <Image source={{ uri: exercise.imageUrl }} style={styles.image} />
      )}

      <Text style={styles.title}>{exercise.name}</Text>

      <Text style={styles.detail}>🧭 Séries : {exercise.sets}</Text>
      <Text style={styles.detail}>🔁 Répétitions : {exercise.reps}</Text>
      <Text style={styles.detail}>🏋️‍♂️ Poids : {exercise.weight} kg</Text>
      <Text style={styles.detail}>⏱️ Repos : {exercise.restTime} sec</Text>

      <Text style={styles.description}>
        {exercise.comment || 'Aucun commentaire.'}
      </Text>

      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: '/session', params: { exerciseId: exercise.id } })
        }
        style={styles.startButton}
      >
        <Text style={styles.startButtonText}>▶️ Commencer</Text>
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
    fontSize: 16,
    color: '#777',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginTop: 16,
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
