import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { loginUser } from '@/lib/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password)
      await AsyncStorage.setItem('user', JSON.stringify(user))
      Alert.alert('Connexion réussie')
      router.replace('/(tabs)' as any) // ou une autre page après connexion
    } catch (err: any) {
      Alert.alert('Erreur', err.message)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Connexion</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <TouchableOpacity onPress={handleLogin} style={{ padding: 12, backgroundColor: '#000' }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  )
}
