import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform } from "react-native";
import {Text, View} from 'react-native'
import { ReceiptStack } from "./ReceiptStack";
import { ChatStack } from "./ChatStack";
import { WalkStack } from "./WalkStack";

const Tab = createBottomTabNavigator()

const MainStack = () => {
    return <Tab.Navigator screenOptions={{
      headerShown: false
    }} >
        <Tab.Screen
          name="ReceiptStack"
          component={ReceiptStack}
        />
        <Tab.Screen
          name="WalkStack"
          component={WalkStack}
        />
        <Tab.Screen
          name="ChatStack"
          component={ChatStack}
        />
    </Tab.Navigator>
}

export default MainStack