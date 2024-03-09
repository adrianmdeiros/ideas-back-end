import { Response, Request } from 'express'
import { database } from '../database'
import { StatusCodes } from 'http-status-codes'
import { ApiError } from '../helpers/ApiError'
import { UserRepository } from '../repositories/UserRepository'
import { UserService } from '../services/UserService'

// Serializar BigInt - Prisma ORM bugfix
declare global {
    interface BigInt {
        toJSON(): string
    }
}
BigInt.prototype.toJSON = function () {
    return this.toString()
}

export class UserController {
    async create(req: Request, res: Response) {
        const { id, name, email, phone, bond, course } = req.body

        const user = {
            id,
            name,
            email,
            phone,
            bond,
            course
        }

        const userService = new UserService(new UserRepository())
        const userCreated = await userService.save(user)

        return res.status(StatusCodes.CREATED).json(userCreated)

    }

    async read(req: Request, res: Response) {
        const { id } = req.query

        const userService = new UserService(new UserRepository())

        if (id) {
            const userByid = await userService.findBy(Number(id))
            return res.status(StatusCodes.OK).json(userByid)
        }

        const users = await userService.all()

        return res.status(StatusCodes.OK).json(users)

    }

    async readContacts(req: Request, res: Response) {
        const { userid } = req.query

        const userService = new UserService(new UserRepository())
        const userContacts = await userService.findContacts(Number(userid))
        
        return res.status(StatusCodes.OK).json(userContacts)

    }

    async updateContacts(req: Request, res: Response) {
        const { email, phone } = req.body
        const { userid } = req.query

        const contacts = {
            email,
            phone
        }

        const userService = new UserService(new UserRepository())
        const updatedContacts = await userService.update(contacts, Number(userid))
        
        return res.status(StatusCodes.OK).json(updatedContacts)
    }

}