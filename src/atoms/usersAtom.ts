import { atom } from "recoil"

export interface UserProfile {
    displayName: string
    userName: string
    numberOfMemes: number
    numberOfVotes: number
    description: string
    imageURL?: string
}