import { createContext } from "react";
import type { DailyTask, Receipt } from '../utils/types'

type TContext = {
    receipts: Receipt[]
    setReceipts?: React.Dispatch<React.SetStateAction<Receipt[]>> | null
    challenges: DailyTask[]
    setChallenges?: React.Dispatch<React.SetStateAction<DailyTask[]>> | null
    user: string
    setUser: React.Dispatch<React.SetStateAction<string>> | null,
    listId: string,
    setListId: React.Dispatch<React.SetStateAction<string>> | null
    totalPoints: number,
    setTotalPoints: React.Dispatch<React.SetStateAction<number>> | null
}

const defaultContext: TContext = {
    receipts: [],
    setReceipts: null,
    challenges: [],
    setChallenges: null,
    user: "",
    setUser: null,
    listId: "",
    setListId: null,
    totalPoints: 0,
    setTotalPoints: null
}

export const Context = createContext<TContext>(defaultContext)
    