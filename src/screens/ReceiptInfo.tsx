import React from "react";
import { Image, Text, View } from "react-native";
import type { Receipt as TReceipt } from '../utils/types'
import { BACKEND_URL } from "../utils/config";

interface ReceiptInfoScreenProps {
    route: {
        params: {
            receipt: TReceipt
        }
    }
}

const ReceiptInfo: React.FC<ReceiptInfoScreenProps> = ({ route }) => {

    return (
        <View style={{
            padding: 15
        }}>
            <Text style={{ fontWeight: 'bold', fontSize: 29}}>
                Tu compra en {route.params.receipt.storeName ?? "Unknown"}
            </Text>
            <Text style={{
                marginTop: 5,
                fontSize: 19,
                fontWeight: 'bold'
            }}>
                El dia {new Date(route.params.receipt.shoppingDate.toString()).toLocaleString()}
            </Text>

            {/** Shopping info */}
            <View style={{
                marginTop: 20,
                flexDirection: 'column'
            }}>
                <Text style={{
                    fontSize: 16
                }}>Total de la compra: {route.params.receipt.amount.toFixed(2)}€</Text>
                <Image
                    style={{
                        height: 550,
                        marginTop: 10
                    }}
                    source={{ uri: `${BACKEND_URL}/api/upload/${route.params.receipt.url}` }}
                />
            </View>
        </View>
    )
}

export default ReceiptInfo
