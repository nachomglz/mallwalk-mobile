export type Receipt = {
    _id: string
    storeName: string
    amount: number
    device: string
    shoppingDate: Date
    url: string
}

export type DailyTask = {
    _id: string
    name: string
    status: number
    location: [number, number],
    img: string
    date: Date
    category: string[],
    reward: number
}
