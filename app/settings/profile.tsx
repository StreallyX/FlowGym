import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
  ActionSheetIOS,
  Platform,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import { getUserData, updateUserProfile } from '@/lib/firebaseHelpers'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function EditProfileScreen() {
  const [userId, setUserId] = useState('')
  const [localImageUri, setLocalImageUri] = useState<string | null>(null)
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    bio: '',
    profilePicture: '',
  })

  useEffect(() => {
    const load = async () => {
      const storedUser = JSON.parse(await AsyncStorage.getItem('user'))
      setUserId(storedUser.id)
      const data = await getUserData(storedUser.id)
      setProfile({
        name: data.name || '',
        username: data.username || '',
        bio: data.bio || '',
        profilePicture: data.profilePicture || '',
      })
    }
    load()
  }, [])

  const chooseImageSource = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Annuler', 'Prendre une photo', 'Choisir depuis la galerie'],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) takePhoto()
          else if (buttonIndex === 2) pickFromGallery()
        }
      )
    } else {
      // Android : simple menu console, ou utiliser un package type ActionSheet
      Alert.alert('Choisir une option', '', [
        { text: 'Appareil photo', onPress: takePhoto },
        { text: 'Galerie', onPress: pickFromGallery },
        { text: 'Annuler', style: 'cancel' },
      ])
    }
  }

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    })
    if (!result.canceled) {
      setLocalImageUri(result.assets[0].uri)
    }
  }

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    })
    if (!result.canceled) {
      setLocalImageUri(result.assets[0].uri)
    }
  }

  const saveProfile = async () => {
    try {
      let profilePictureUrl = profile.profilePicture

      if (localImageUri) {
        const blob = await (await fetch(localImageUri)).blob()
        const imageRef = ref(storage, `users/profile/${userId}.jpg`)
        await uploadBytes(imageRef, blob)
        profilePictureUrl = await getDownloadURL(imageRef)
      }

      await updateUserProfile(userId, {
        ...profile,
        profilePicture: profilePictureUrl,
      })

      Alert.alert('Succès', 'Profil mis à jour avec succès.')
    } catch (err) {
      console.error('Erreur lors de la sauvegarde du profil :', err)
      Alert.alert('Erreur', "La mise à jour du profil a échoué.")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Modifier le profil</Text>

      <TouchableOpacity onPress={chooseImageSource} style={styles.imageWrapper}>
        <Image
          source={
            localImageUri
              ? { uri: localImageUri }
              : profile.profilePicture
              ? { uri: profile.profilePicture }
              : require('@/assets/images/defaultavatar.png')
          }
          style={styles.avatar}
        />
        <Text style={styles.changePhoto}>Changer la photo</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Nom complet"
        value={profile.name}
        onChangeText={text => setProfile({ ...profile, name: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Pseudo"
        value={profile.username}
        onChangeText={text => setProfile({ ...profile, username: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Bio"
        value={profile.bio}
        onChangeText={text => setProfile({ ...profile, bio: text })}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
    backgroundColor: '#ddd',
  },
  changePhoto: {
    color: '#2563EB',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})
