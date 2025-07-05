import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'

// ⚠️ Remplace ceci plus tard avec `i18n.language` si tu actives i18next
const currentLang = 'fr' // à remplacer dynamiquement plus tard

export default function LanguageSettings() {
  const handleChangeLang = (lang: string) => {
    // À connecter plus tard avec i18n.changeLanguage(lang)
    console.log('Change language to:', lang)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Langue de l'application</Text>

      <TouchableOpacity
        style={[
          styles.button,
          currentLang === 'fr' ? styles.selected : styles.unselected,
        ]}
        onPress={() => handleChangeLang('fr')}
      >
        <Text
          style={[
            styles.buttonText,
            currentLang === 'fr' ? styles.selectedText : styles.unselectedText,
          ]}
        >
          🇫🇷 Français
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          currentLang === 'en' ? styles.selected : styles.unselected,
        ]}
        onPress={() => handleChangeLang('en')}
      >
        <Text
          style={[
            styles.buttonText,
            currentLang === 'en' ? styles.selectedText : styles.unselectedText,
          ]}
        >
          🇬🇧 English
        </Text>
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
    color: '#222',
    marginBottom: 24,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  selected: {
    backgroundColor: '#2563EB',
  },
  unselected: {
    backgroundColor: '#f2f2f2',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  unselectedText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonText: {
    textAlign: 'center',
  },
})
