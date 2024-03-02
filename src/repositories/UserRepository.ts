import { StatusCodes } from "http-status-codes"
import { database } from "../database"
import { ApiError } from "../helpers/ApiError"
import { User } from "../types/User"
import { isListEmpty } from "../utils/isListEmpty"
import { UserContacts } from "../types/UserContacts"


export class UserRepository {

    private queryTemplate = {
        name: true,
        email: true,
        phone: true,
        bond: true,
        course: true
    }

    public async findBy(id: number) {
        const user = await database.user.findFirst({
            where: {
                id: id
            },
            select: this.queryTemplate
        })
        return user
    }

    public async create(user: User) {

        if (!user.id) {
            throw new ApiError('SUAP id is required.', StatusCodes.BAD_REQUEST)
        }

        const userCreated = await database.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                bond: user.bond,
                course: {
                    connectOrCreate: {
                        where: {
                            name: user.course
                        },
                        create: {
                            name: user.course
                        }
                    }
                }
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

    public async findContacts(userid: number) {
        const userContacts = await database.user.findFirst({
            where: {
                id: userid
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

    public async update(contacts: UserContacts, userid: number) {
        if (!userid) {
            throw new ApiError('id is required.', StatusCodes.BAD_REQUEST)
        }

        if (contacts.email || contacts.phone) {
            const updatedContacts = await database.user.update({
                where: {
                    id: userid
                },
                data: {
                    email: contacts.email,
                    phone: contacts.phone
                }
            })
            return updatedContacts

        }

        throw new ApiError('email or phone are required.', StatusCodes.BAD_REQUEST)

    }



} 