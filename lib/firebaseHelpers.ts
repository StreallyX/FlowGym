import { getFirestore, updateDoc, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
import { db } from './firebase' // assure-toi d’avoir un fichier firebase.ts avec l'initialisation

export const getUserData = async (userId: string) => {
  const docRef = doc(db, 'users', userId)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? snapshot.data() : null
}

export const getFlowsByUser = async (userId: string) => {
  const q = query(collection(db, 'flows'), where('userId', '==', userId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const getWorkoutHistory = async (userId: string) => {
  const q = query(collection(db, 'workoutHistory'), where('userId', '==', userId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => doc.data())
}

export const updateUserProfile = async (userId: string, data: any) => {
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, {
    name: data.name,
    username: data.username,
    bio: data.bio,
    profilePicture: data.profilePicture,
  })
}

export const getExercisesByUser = async (userId: string) => {
  const q = query(collection(db, 'exercises'), where('userId', '==', userId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
