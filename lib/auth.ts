import { db } from './firebase'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import * as Crypto from 'expo-crypto'

// Fonction pour hacher un mot de passe
async function hashPassword(password: string) {
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password)
}

// ✅ Fonction d'inscription
export async function registerUser(email: string, password: string) {
  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('email', '==', email))
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    throw new Error('Email déjà utilisé.')
  }

  const hashedPassword = await hashPassword(password)
  await addDoc(usersRef, { email, password: hashedPassword, createdAt: new Date() })
  return true
}

// ✅ Fonction de connexion
export async function loginUser(email: string, password: string) {
  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('email', '==', email))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    throw new Error('Utilisateur introuvable')
  }

  const userDoc = snapshot.docs[0]
  const userData = userDoc.data()

  const hashedPassword = await hashPassword(password)

  if (userData.password !== hashedPassword) {
    throw new Error('Mot de passe incorrect')
  }

  return {
    id: userDoc.id,
    email: userData.email,
  }
}
