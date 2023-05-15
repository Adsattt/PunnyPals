import { atom } from "recoil"

export interface UserProfile {
    id: string
    numberOfMemes: number
    numberOfVotes: number
    description: string
    imageURL?: string
}