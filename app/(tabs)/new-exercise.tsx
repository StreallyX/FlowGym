import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db, storage } from '@/lib/firebase'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateDoc } from 'firebase/firestore'
import { uploadImage } from '@/lib/uploadImage'

export default function NewExerciseScreen() {
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const [restTime, setRestTime] = useState('')
  const [comment, setComment] = useState('')
  const [image, setImage] = useState<string | null>(null)

  const router = useRouter()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Le nom est requis')
      return
    }

    const user = await AsyncStorage.getItem('user')
    const userData = user ? JSON.parse(user) : null
    if (!userData) {
      Alert.alert('Erreur', 'Utilisateur non connecté')
      return
    }

    try {
      const docRef = await addDoc(collection(db, 'exercises'), {
        userId: userData.id,
        name,
        weight,
        reps,
        sets,
        restTime,
        comment,
        createdAt: Timestamp.now(),
        imageUrl: '', // temporaire
      })

      let imageUrl = ''
      if (image) {
        imageUrl = await uploadImage(image, `user/exercises/${docRef.id}.jpg`)
      }

      // Mettre à jour l’image si elle existe
      if (imageUrl) {
        await updateDoc(docRef, { imageUrl }) // ← ajoute l'image proprement
        }

      Alert.alert('Succès', 'Exercice enregistré')
      router.back()
    } catch (e) {
      console.error(e)
      Alert.alert('Erreur', 'Impossible d’enregistrer l’exercice')
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Exercise</Text>

      <Text style={styles.label}>Name *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Bench Press"
      />

      <Text style={styles.label}>Image (optional)</Text>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : null}
      <TouchableOpacity onPress={pickImage} style={styles.buttonOutline}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        placeholder="e.g. 60"
      />

      <Text style={styles.label}>Reps</Text>
      <TextInput
        style={styles.input}
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
        placeholder="e.g. 10"
      />

      <Text style={styles.label}>Sets</Text>
      <TextInput
        style={styles.input}
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
        placeholder="e.g. 4"
      />

      <Text style={styles.label}>Rest Time (sec)</Text>
      <TextInput
        style={styles.input}
        value={restTime}
        onChangeText={setRestTime}
        keyboardType="numeric"
        placeholder="e.g. 90"
      />

      <Text style={styles.label}>Comment</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={comment}
        onChangeText={setComment}
        placeholder="Add notes..."
        multiline
      />

      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonTextWhite}>Save Exercise</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 6,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 12,
    borderRadius: 6,
  },
})
