import React, { useState } from 'react'
import ReceiptList from '../screens/ReceiptList'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReceiptInfo from '../screens/ReceiptInfo'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ReceiptCamera from '../components/ReceiptCamera'
import { useNavigation } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

export const ReceiptStack = () => {
  const navigation = useNavigation<any>()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceiptList"
        options={{
          title: "Receipts",
          headerRight: (props) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ReceiptCamera')}
            >
              <Icon name='ios-camera' size={30} color={"#007AFF"} />
            </TouchableOpacity>
          )
        }}
        component={ReceiptList}
      />
      <Stack.Screen name="ReceiptInfo" component={ReceiptInfo as any} />
      <Stack.Screen name="ReceiptCamera" component={ReceiptCamera} />
    </Stack.Navigator>
  )
}