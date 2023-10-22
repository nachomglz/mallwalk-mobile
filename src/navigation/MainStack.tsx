import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform } from "react-native";
import {Text, View} from 'react-native'
import { ReceiptStack } from "./ReceiptStack";
import { ChatStack } from "./ChatStack";
import { WalkStack } from "./WalkStack";
import { FindMeStack } from "./FindMeStack";

const Tab = createBottomTabNavigator()

const MainStack = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="ReceiptStack"
      >
          <Tab.Screen
            name="ReceiptStack"
            options={{
              title: "Facturas"
            }}
            component={ReceiptStack}
          />
          <Tab.Screen
            options={{
              title: "Find me"
            }}
            name="FindMeGame"
            component={FindMeStack}
          />
      </Tab.Navigator>)
    
}

export default MainStack