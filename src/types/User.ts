import { BondType } from "@prisma/client"

export type User = {
    id: number, 
    name: string, 
    email: string,  
    phone: string, 
    bond: BondType
}