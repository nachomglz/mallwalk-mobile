import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainStack from "./MainStack";

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MainStack} />
        </Stack.Navigator>
    )
}

export default StackNavigator