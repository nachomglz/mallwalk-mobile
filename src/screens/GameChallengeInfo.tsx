import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import type { DailyTask} from '../utils/types'
import { useNavigation } from "@react-navigation/native";

interface GameChallengeInfoScreenProps {
    route: {
        params: {
            challenge: DailyTask
        }
    }
}

const GameChallengeInfo: React.FC<GameChallengeInfoScreenProps> = ({ route }) => {
    const navigation = useNavigation<any>()
    return (
        <View style={{
            padding: 15
        }}>
            <Text style={{ fontWeight: 'bold', fontSize: 29}}>
                {route.params.challenge.name ?? "Unknown"}
            </Text>
            <Text style={{
                marginTop: 5,
                fontSize: 19,
                fontWeight: 'bold'
            }}>
                Premio: <Text style={{
                    color: 'orange'
                }}>{route.params.challenge.reward} puntos</Text>
            </Text>

            {route.params.challenge.status
                ? (
                    <Text style={{
                        marginTop: 5,
                        fontSize: 15,
                        color: "green"
                    }}>
                        Reto completado
                    </Text>
                ) : (
                    <TouchableOpacity
                        style={{
                            marginTop: 10
                        }}
                        onPress={() => navigation.navigate('GameCamera', { taskId: route.params.challenge._id })}
                    >
                        <Text style={{
                            fontSize: 15,
                            color: "#007AFF"
                        }}>Completar reto</Text>
                    </TouchableOpacity>
                )
            }

            <View style={{
                marginTop: 20,
                flexDirection: 'column'
            }}>
                <Image
                    style={{
                        height: 600,
                        marginTop: 10
                    }}
                    source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffastly.4sqi.net%2Fimg%2Fgeneral%2F600x600%2F411003045_mlq84NXUQM-0n0TKgtFZ3e-9LvY_F65T9r7V4js3hJs.jpg&f=1&nofb=1&ipt=dfbb929e7f76040f47f0b69ab470ae65736419a0c850324c208c7c54ace21df7&ipo=images" }}
                />
            </View>
        </View>
    )
}

export default GameChallengeInfo
