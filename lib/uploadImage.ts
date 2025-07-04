import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from './firebase'

/**
 * Uploads a local image to Firebase Storage using fetch + Blob.
 * @param uri URI from ImagePicker (e.g. result.assets[0].uri)
 * @param pathInStorage Path in your Firebase bucket (e.g. "user/exercises/abc123.jpg")
 */
export async function uploadImage(uri: string, pathInStorage: string): Promise<string> {
  try {
    const response = await fetch(uri)
    const blob = await response.blob()

    const storageRef = ref(storage, pathInStorage)
    await uploadBytes(storageRef, blob)

    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  } catch (err) {
    console.error('Upload failed:', err)
    throw new Error("L'upload de l'image a échoué.")
  }
}
