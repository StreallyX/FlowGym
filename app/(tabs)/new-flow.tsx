import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
} from 'react-native'
import { useRouter } from 'expo-router'
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

type SelectedExercise = {
  uniqueId: string // pour éviter la duplication
  exerciseId: string
  name: string
  restTime?: string
}

export default function NewFlowScreen() {
  const [flowName, setFlowName] = useState('')
  const [exercises, setExercises] = useState<any[]>([])
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([])
  const [modalVisible, setModalVisible] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchExercises = async () => {
      const snapshot = await getDocs(collection(db, 'exercises'))
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setExercises(list)
    }

    fetchExercises()
  }, [])

  const addExerciseToFlow = (exercise: any) => {
    const newEntry: SelectedExercise = {
      uniqueId: `${exercise.id}-${Date.now()}`, // clé unique
      exerciseId: exercise.id,
      name: exercise.name,
      restTime: '',
    }
    setSelectedExercises(prev => [...prev, newEntry])
    setModalVisible(false)
  }

  const handleRestTimeChange = (uniqueId: string, value: string) => {
    setSelectedExercises(prev =>
      prev.map(ex => (ex.uniqueId === uniqueId ? { ...ex, restTime: value } : ex))
    )
  }

  const handleCreate = async () => {
    if (!flowName.trim() || selectedExercises.length === 0) {
      Alert.alert('Error', 'Enter a flow name and add at least one exercise.')
      return
    }

    const user = await AsyncStorage.getItem('user')
    const userData = user ? JSON.parse(user) : null
    if (!userData) {
      Alert.alert('Erreur', 'Utilisateur non connecté')
      return
    }

    try {
      await addDoc(collection(db, 'flows'), {
        userId: userData.id,
        name: flowName,
        exercises: selectedExercises.map(ex => ({
          exerciseId: ex.exerciseId,
          restTime: ex.restTime,
        })),
        createdAt: Timestamp.now(),
      })

      Alert.alert('Success', `Flow "${flowName}" created!`)
      router.back()
    } catch (e) {
      console.error(e)
      Alert.alert('Erreur', 'Impossible de sauvegarder le flow')
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Create a New Flow
      </Text>

      <TextInput
        placeholder="Flow name (e.g. Pull Day)"
        value={flowName}
        onChangeText={setFlowName}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: '#2563EB',
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>+ Add Exercise</Text>
      </TouchableOpacity>

      {selectedExercises.map((ex, idx) => (
        <View key={ex.uniqueId} style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold' }}>Exercise {idx + 1}: {ex.name}</Text>
          <TextInput
            placeholder="Rest time after this (optional)"
            value={ex.restTime}
            onChangeText={value => handleRestTimeChange(ex.uniqueId, value)}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              padding: 8,
              marginTop: 4,
              borderRadius: 6,
            }}
          />
        </View>
      ))}

      <TouchableOpacity
        onPress={handleCreate}
        style={{ backgroundColor: '#000', padding: 14, borderRadius: 8, marginTop: 20 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Save Flow
        </Text>
      </TouchableOpacity>

      {/* Exercise Selection Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 12 }}>Choose an Exercise</Text>
          <FlatList
            data={exercises}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => addExerciseToFlow(item)}
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderColor: '#ccc',
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              padding: 12,
              backgroundColor: '#ccc',
              borderRadius: 8,
              marginTop: 16,
              alignItems: 'center',
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}
