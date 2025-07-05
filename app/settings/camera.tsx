import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export default function CameraSettings() {
  const [granted, setGranted] = useState<boolean | null>(null)

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await ImagePicker.getCameraPermissionsAsync()
      setGranted(status === 'granted')
    }
    checkPermission()
  }, [])

  const askPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    setGranted(status === 'granted')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Autorisation Caméra</Text>

      <Text style={styles.status}>
        Statut :{' '}
        {granted === null
          ? '...'
          : granted
          ? 'Autorisé ✅'
          : 'Refusé ❌'}
      </Text>

      {!granted && (
        <TouchableOpacity onPress={askPermission} style={styles.button}>
          <Text style={styles.buttonText}>Demander l'autorisation</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})
