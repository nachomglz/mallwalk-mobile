import { useEffect, useState} from 'react'
import StackNavigator from './src/navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Context } from './src/context/Context';
import { DailyTask, Receipt as TReceipt } from './src/utils/types'
import { View, Text } from 'react-native';
import { getDevice, getDeviceToken, getUniqueId } from 'react-native-device-info'

export default function App() {
  const [receipts, setReceipts] = useState<TReceipt[]>([])
  const [user, setUser] = useState<string>("")
  const [challenges, setChallenges] = useState<DailyTask[]>([])
  const [listId, setListId] = useState<string>("")
  const [totalPoints, setTotalPoints] = useState<number>(0)

  return (
    <Context.Provider
      value={{
        receipts,
        setReceipts,
        setUser,
        user,
        challenges,
        setChallenges,
        listId,
        setListId,
        totalPoints,
        setTotalPoints
      }}
    >
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Context.Provider>
  );
}
