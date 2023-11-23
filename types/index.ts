import {User} from "@prisma/client"
export type SafeUser =  Omit<User,"createdAt" | "UpdateAt" | "emailVerified"> & {
    createdAt: string,
    updateAt: string,
    emailVerified: string | null,
}