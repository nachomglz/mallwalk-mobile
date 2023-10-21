import React from 'react'
import Receipt from '../screens/Receipt'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const ReceiptStack = () => {
    return <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="ReceiptScreen" component={Receipt} />
    </Stack.Navigator>
}