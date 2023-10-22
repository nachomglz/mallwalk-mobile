import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GameChallengeList from '../screens/GameChallengeList'
import GameCamera from '../components/GameCamera'
import { useNavigation } from '@react-navigation/native'
import GameChallengeInfo from '../screens/GameChallengeInfo'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Context } from '../context/Context'

const Stack = createNativeStackNavigator()

export const FindMeStack = () => {
  const navigation = useNavigation<any>()
  const context = useContext(Context)

  return (
    <Stack.Navigator screenOptions={{
      headerRight: (props) => (
        <View>
          <Text style={{
            fontSize: 17
          }}>
            Puntos: <Text style={{ color: 'orange' }}>{context.totalPoints}</Text>
          </Text>
        </View>
      )
    }}>
      <Stack.Screen
        name="GameChallenges"
        options={{
          title: "Retos",
        }}
        component={GameChallengeList as any}
      />
      <Stack.Screen
        name="GameChallengeInfo"
        options={{
          title: "Reto",
        }}
        component={GameChallengeInfo as any}
      />
      <Stack.Screen name="GameCamera" component={GameCamera as any} />
    </Stack.Navigator>
  )
}