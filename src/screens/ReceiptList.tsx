import React, { useContext, useEffect } from "react";
import * as ReceiptListItem from "../components/Receipt"
import { FlatList, Text, View } from "react-native";
import { Context } from "../context/Context";
import axios from 'axios'
import { BACKEND_URL } from "../utils/config";

const ReceiptList = () => {
    const { receipts, user, setReceipts} = useContext(Context)

    useEffect(() => {
        getReceipts()
    }, [])

    async function getReceipts() {
        try {
            let response = await axios.get(BACKEND_URL + '/api/bill/all', {
                headers: {
                    "Device": user
                }
            })

            if(response.data?.ok) {
                console.log("Response: ", JSON.stringify(response.data, null, 3))
                setReceipts!(response.data?.data)
            } else {
                setReceipts!([])
            }
        } catch(error) {
            console.error("Error: ", error)
            alert("Error getting the receipts from the server")
        }
    }

    return (
        <View style={{
            padding: 15,
            flex: 1
        }}>
            {receipts.length > 0 ? (
                <FlatList
                    style={{
                        flex: 1,
                        gap: 15,
                    }}
                    data={receipts}
                    renderItem={({item}) => <ReceiptListItem.default {...item} />}
                />
            ) : (
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Pulsa la camara para anadir tu primer ticket</Text>
            )}
        </View>
    )
}

export default ReceiptList