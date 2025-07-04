// src/lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAXYoUuOBVpE3GagOotim6w_KX_PILEA4c',
  authDomain: 'flowgym-f5a95.firebaseapp.com',
  projectId: 'flowgym-f5a95',
  storageBucket: 'flowgym-f5a95.firebasestorage.app',
  messagingSenderId: '648983222717',
  appId: '1:648983222717:web:358faa933ba50f8d8a5ad4',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
