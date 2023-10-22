import React, { useContext, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import * as ReceiptListItem from "../components/Receipt"
import { FlatList } from "react-native";
import type { DailyTask } from "../utils/types";
import Challenge from "../components/Challenge";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { Context } from "../context/Context";
import { useNavigation } from "@react-navigation/native";

interface GameChallengeListScreenProps {
  route: {
    params: {
      refresh: boolean
    }
  }
}

const GameChallengeList: React.FC<GameChallengeListScreenProps> = ({ route }) => {
    const context = useContext(Context)
    const navigation = useNavigation<any>()

    useEffect(() => {
        getTotalPoints()
        getChallenges()
    }, [])

    async function getTotalPoints() {
        try {
            console.log("getting points")
            let response = await axios.get(`${BACKEND_URL}/api/score?deviceId=${context.user}`)
            if(response.data?.data._id) {
                context.setTotalPoints!(response.data?.data.totalpoints ?? 0)
            } else {
                alert("Something unexpected happened getting the challenges from the server")
            }
            console.log("got points")
        } catch(error) {
            console.error("Error: ", error)
            alert("Error getting the challenges from the server")
        }
    }

    async function getChallenges() {
        try {
            let response = await axios.get(`${BACKEND_URL}/api/dailytask?deviceId=${context.user}`)
            if(response.data?.data.deviceId) {
                const responseChallenges = response.data?.data.places as DailyTask[]
                const responseListId = response.data?.data._id as string
                context.setChallenges!(responseChallenges.sort((a, b) => a.status - b.status))
                context.setListId!(responseListId)
            } else {
                alert("Something unexpected happened getting the challenges from the server")
            }
        } catch(error) {
            console.error("Error: ", error)
            alert("Error getting the challenges from the server")
        }
    }

    return (
        <FlatList
            style={{
                paddingHorizontal: 15,
                flex: 1,
                gap: 15,
            }}
            data={context.challenges}
            renderItem={({item}) => <Challenge {...item} />}
        />
    )
}

export default GameChallengeList