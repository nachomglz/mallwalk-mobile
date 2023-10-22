import React from 'react'
import Walk from '../screens/Walk'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const WalkStack = () => {
    return <Stack.Navigator>
      <Stack.Screen name="Walking" component={Walk} />
    </Stack.Navigator>
}