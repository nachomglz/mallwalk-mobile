import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import type { Receipt as TReceipt } from '../utils/types'
import { useNavigation } from '@react-navigation/native'
import { Context } from '../context/Context'
import { BACKEND_URL } from '../utils/config'

type Props = TReceipt

const Receipt = (props: Props) => {
    const receiptContext = useContext(Context)
    const navigation = useNavigation<any>()

    return (
        <TouchableOpacity
            style={{
                backgroundColor: 'white',
                marginTop: 20,
                padding: 15,
                borderRadius: 15,
                gap: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
            onPress={() => navigation.navigate('ReceiptInfo', { receipt: props })}
        >
            <View style={{
                flex: 1,
                gap: 10
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 19
                }}>{props.storeName ?? "Unknown"}</Text>
                <Text>{new Date(props.shoppingDate.toString()).toLocaleString()}</Text>
                <Text style={{
                    fontSize: 15
                }}>Total: <Text style={{ fontWeight: 'bold'}}>{props.amount.toFixed(2)}</Text></Text>
            </View>
            <View>
                <Image
                    style={{
                        flex: 1,
                        width: 50,
                        borderRadius: 15
                    }}
                    source={{ uri: `${BACKEND_URL}/api/upload/${props.url}` }}
                />
            </View>
        </TouchableOpacity>
    )
}

export default Receipt