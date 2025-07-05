import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'

export default function AboutPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>À propos de FlowGym</Text>

      <Text style={styles.text}>Version 1.0.0</Text>
      <Text style={styles.text}>
        FlowGym est une application pour créer, suivre et partager tes entraînements personnalisés.
        Construite pour t’aider à rester motivé et connecté avec tes amis.
      </Text>

      <Text style={styles.footer}>© {new Date().getFullYear()} FlowGym. Tous droits réservés.</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
    lineHeight: 22,
  },
  footer: {
    fontSize: 13,
    color: '#999',
    marginTop: 40,
  },
})
