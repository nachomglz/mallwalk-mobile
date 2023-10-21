import React from 'react'
import Walk from '../screens/Walk'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const WalkStack = () => {
    return <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="WalkScreen" component={Walk} />
    </Stack.Navigator>
}