import React from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Walk  = () => {

    async function readUser() {
        try {
            let userInfo
        } catch {
            alert("Error reading user info")
        }
    }
    return <View>
        <Text>
            hola mundo (Walk)
        </Text>
    </View>
}

export default Walk