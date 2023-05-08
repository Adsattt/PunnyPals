import { atom } from "recoil"

export interface OtherProfile {
    id: string
    numberOfMemes: number
    numberOfVotes: number
    description: string
    imageURL?: string
}