import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import MainStack from "./MainStack";
import Login from "../screens/Login";
import { Context } from "../context/Context";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    const { user } = useContext(Context)

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={MainStack} />
        </Stack.Navigator>
    )
}

export default StackNavigator