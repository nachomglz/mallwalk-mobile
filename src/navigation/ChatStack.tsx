import React from 'react'
import Chat from '../screens/Chat'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const ChatStack = () => {
    return <Stack.Navigator >
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
}