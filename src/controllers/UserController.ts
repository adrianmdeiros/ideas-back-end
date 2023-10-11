import { Response, Request } from 'express'
import { database } from '../database'

// Serializar BigInt - bugfix
declare global{
    interface BigInt {
        toJSON(): string
    }
}
BigInt.prototype.toJSON = function() {       
    return this.toString()
}

export class UserController{
    async create(req: Request, res: Response){
        const { id, name, email, phone, avatarURL, bond, bio, projects } = req.body

        const user = await database.user.create({
            data: {
                id,
                name,
                email,
                phone,
                avatarURL,
                bond,
                bio,
                projects
            }
        })


        return res.status(201).json(user)
    }

}