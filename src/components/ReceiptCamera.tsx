import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native'
import { Camera, CameraType, CameraCapturedPicture } from 'expo-camera'
import { useNavigation } from '@react-navigation/native'
import { Context } from '../context/Context'
import axios from 'axios'
import { BACKEND_URL } from '../utils/config'
import { Receipt } from '../utils/types'

const ReceiptCamera = () => {
  const receiptContext = useContext(Context)
  const navigation = useNavigation<any>()
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<Camera | null>(null)
  const [newPicture, setNewPicture] = useState<CameraCapturedPicture | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
            const response = await axios.post(BACKEND_URL + "/api/bill/upload", formData, { headers: {
              'Content-Type': 'multipart/form-data',
              'Device': receiptContext.user
            }})
            

            if (response.data?.ok) {
              const billResponse = response.data?.data

              const newReceipt: Receipt = {
                _id: billResponse._id,
                amount: billResponse.amount,
                device: billResponse.device,
                shoppingDate: billResponse.shoppingDate,
                storeName: billResponse.storeName,
                url: billResponse.url
              }

              receiptContext.setReceipts!(prev => [newReceipt, ...prev])


              setIsLoading(false)
              navigation.navigate('ReceiptList')
            } else {
              alert("The image could not be processed...")
              console.log("Reason: ", response.data.error)
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

export default ReceiptCamera