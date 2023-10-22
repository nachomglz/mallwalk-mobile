import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import type { Receipt as TReceipt, DailyTask } from '../utils/types'
import { useNavigation } from '@react-navigation/native'

type Props = DailyTask

const Challenge = (props: Props) => {
    const navigation = useNavigation<any>()

    return (
        <TouchableOpacity
            style={{
                backgroundColor: 'white',
                marginTop: 20,
                borderRadius: 15,
                gap: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                height: 150,
                position: 'relative'
            }}
            onPress={() => navigation.navigate('GameChallengeInfo', { challenge: props })}
        >
            <View style={{
                flex: 1,
                gap: 10,
                padding: 15,
                backgroundColor: 'rgba(0,0,0,0.7)',
                height: '100%',
                borderRadius: 15,
                justifyContent: 'flex-end'
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: props.status ? 'green' : 'red'
                }}>{props.status ? "Completado" : "Sin completar"}</Text>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 23,
                    color: 'white'
                }}>{props.name ?? "Unknown"}</Text>
            </View>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                flex: 1,
                height: '100%',
                width: '100%',
                zIndex: -1,
                borderRadius: 15
            }}>
                <Image
                    style={{
                        borderRadius: 15,
                        flex: 1,
                        width: '100%',
                    }}
                    source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffastly.4sqi.net%2Fimg%2Fgeneral%2F600x600%2F411003045_mlq84NXUQM-0n0TKgtFZ3e-9LvY_F65T9r7V4js3hJs.jpg&f=1&nofb=1&ipt=dfbb929e7f76040f47f0b69ab470ae65736419a0c850324c208c7c54ace21df7&ipo=images" }}
                />
            </View>
        </TouchableOpacity>
    )
}

export default Challenge