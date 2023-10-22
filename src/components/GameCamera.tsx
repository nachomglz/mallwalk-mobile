import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native'
import { Camera, CameraType, CameraCapturedPicture } from 'expo-camera'
import { useNavigation } from '@react-navigation/native'
import { Context } from '../context/Context'
import axios from 'axios'
import { BACKEND_URL } from '../utils/config'
import { DailyTask } from '../utils/types'

interface GameChallengeCameraScreenProps {
  route: {
    params: {
      taskId: string
    }
  }
}

const GameCamera: React.FC<GameChallengeCameraScreenProps> = ({ route }) => {
  const context = useContext(Context)
  const navigation = useNavigation<any>()
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<Camera | null>(null)
  const [newPicture, setNewPicture] = useState<CameraCapturedPicture | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function getChallenges() {
    try {
      let response = await axios.get(`${BACKEND_URL}/api/dailytask?deviceId=${context.user}`)
      if(response.data?.data.deviceId) {
        const responseChallenges = response.data?.data.places as DailyTask[]
        const responseListId = response.data?.data._id as string
        context.setChallenges!(responseChallenges.sort((a, b) => a.status - b.status))
        context.setListId!(responseListId)
      } else {
        alert("Something unexpected happened getting the challenges from the server")
      }
    } catch(error) {
      console.error("Error: ", error)
      alert("Error getting the challenges from the server")
    }
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePicture() {
    setIsLoading(true)
    if (cameraRef) {
      cameraRef.takePictureAsync({
        quality: 0.1
      })
        .then(async ({ uri }) => {
          const formData = new FormData();

          (formData as any).append('file', {
            uri: uri,
            type: 'image/jpeg',
            name: 'image.jpg',
          });

          try {
            console.log("request url: ", `${BACKEND_URL}/api/dailytask?deviceId=${context.user}&placeId=${route.params.taskId}&taskId=${context.listId}`)
            const response = await axios.post(`${BACKEND_URL}/api/dailytask?deviceId=${context.user}&placeId=${route.params.taskId}&taskId=${context.listId}`, formData, { headers: {
              'Device': context.user
            }})

            if (response.data) {
              getChallenges().then(() => {
                setIsLoading(false)
                navigation.navigate('GameChallenges', { refresh: true })
              })
            } else {
              alert("The image could not be processed...")
              console.log("Reason: ", response.data)
            }

          } catch(error) {
            alert("There was an error sending the imag to the backend")
            console.log("Error bitch: ", error)
          }

        }).catch(err => {
          alert("Error taking picture")
        })
    }
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => setCameraRef(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={isLoading ? styles.loadingButton : styles.button}
            onPress={takePicture}
            disabled={isLoading}
          >
            <Text
              style={styles.text}
            >
              { isLoading ? "Comprobando..." : "Captura" }
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'rgba(255,255,255,0.7)',
    paddingVertical: 15,
    borderRadius: 15,
  },
  loadingButton: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'rgba(255,255,255,0.7)',
    paddingVertical: 15,
    borderRadius: 15,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GameCamera