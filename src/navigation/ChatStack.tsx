import React from 'react'
import Chat from '../screens/Chat'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const ChatStack = () => {
    return <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="ChatScreen" component={Chat} />
    </Stack.Navigator>
}