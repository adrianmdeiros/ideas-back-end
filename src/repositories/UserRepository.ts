import { StatusCodes } from "http-status-codes"
import { database } from "../database"
import { ApiError } from "../helpers/ApiError"
import { isListEmpty } from "../utils/isListEmpty"
import { BondType } from "@prisma/client"
import { User } from "../types/User"
import { UserContacts } from "../types/UserContacts"

export class UserRepository {
    private queryTemplate = {
        name: true,
        email: true,
        phone: true,
        bond: true
    }

    public async findById(id: number) {
        const user = await database.user.findFirst({
            where: {
                id
            },
            select: this.queryTemplate
        })
        return user
    }

    public async save(user: User) {
        if (!user.id) {
            throw new ApiError('SUAP id is required.', StatusCodes.BAD_REQUEST)
        }
        
        const userCreated = await database.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                bond: user.bond
            }
        })
        return userCreated

    }

    public async findAll() {
        const allUsers = await database.user.findMany({
            select: this.queryTemplate
        })

        if (isListEmpty(allUsers)) {
            throw new ApiError("Can't find users.", StatusCodes.NOT_FOUND)
        }
        return allUsers

    }

    public async findContacts(userId: number) {
        const userContacts = await database.user.findFirst({
            where: {
                id: userId
            },
            select: {
                email: true,
                phone: true
            }
        })

        if (!userContacts) {
            throw new ApiError("Can't find user contacts.", StatusCodes.NOT_FOUND)
        }
        return userContacts
    }

    public async update(contacts: UserContacts, userId: number) {
        if (!userId) {
            throw new ApiError('userId is required.', StatusCodes.BAD_REQUEST)
        }

        if (contacts.email || contacts.phone || contacts.email == '' || contacts.phone == '') {
            const updatedContacts = await database.user.update({
                where: {
                    id: userId
                },
                data: {
                    email: contacts.email,
                    phone: contacts.phone
                }
            })
            return updatedContacts

        } else {
            throw new ApiError('Email or Phone are required.', StatusCodes.BAD_REQUEST)
        }

    }


} 