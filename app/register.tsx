import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import { registerUser } from '@/lib/auth'
import { useRouter } from 'expo-router'
import { spacing, radius, typography } from '@/lib/theme'
import { useTheme } from '@/lib/useTheme'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { colors } = useTheme()

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.')
      return
    }

    try {
      setLoading(true)
      await registerUser(email.trim(), password)
      Alert.alert('Succès', 'Inscription réussie', [
        { text: 'OK', onPress: () => router.replace('/login') },
      ])
    } catch (err: any) {
      Alert.alert('Erreur', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: spacing.lg,
        backgroundColor: colors.background,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: typography.title.fontSize,
          fontWeight: typography.title.fontWeight,
          color: colors.text,
          marginBottom: spacing.lg,
          textAlign: 'center',
        }}
      >
        Créer un compte
      </Text>

      <TextInput
        placeholder="Adresse e-mail"
        placeholderTextColor={colors.mutedText}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.md,
          padding: spacing.md,
          color: colors.text,
          marginBottom: spacing.md,
        }}
      />

      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor={colors.mutedText}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.md,
          padding: spacing.md,
          color: colors.text,
          marginBottom: spacing.lg,
        }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        style={{
          backgroundColor: colors.text,
          paddingVertical: spacing.md,
          borderRadius: radius.md,
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text style={{ color: colors.background, fontWeight: 'bold' }}>
            S’inscrire
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  )
}
