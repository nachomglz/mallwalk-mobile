import React, { useContext, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { Context } from '../context/Context'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const { setUser } = useContext(Context)
    const navigation = useNavigation<any>()
    const [email, setEmail] = useState<string>("")

    const submitLogin = async () => {
        try {
            await AsyncStorage.setItem('email', email)
            setUser!(email)
            navigation.navigate('Main')
        } catch {
            alert("Error logging the user in")
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 15,
                paddingTop: 25
            }}
        >
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 34
                }}
            >
                Login
            </Text>
            <View style={{
                marginTop: 100
            }}>
                <TextInput
                    placeholder='Introduce tu email...'
                    onChangeText={text => setEmail(text)}
                    style={{
                        backgroundColor: 'white',
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderRadius: 15,
                        fontSize: 17,
                        marginBottom: 30

                    }}
                />
                <Button title="Login" onPress={submitLogin} />
            </View>
        </SafeAreaView>
    )
}

export default Login