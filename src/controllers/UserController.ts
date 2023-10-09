import { Response, Request } from 'express'
import { database } from '../database'
import { User } from '@prisma/client'

export class UserController{
    async create(req: Request, res: Response){
        const { id, name, email, phone, avatarURL, bond, bio, projects } = req.body

        const user = await database.user.create({
            data: {
                id: id,
                name: name,
                email: email,
                phone: phone,
                avatarURL: avatarURL,
                bond: bond,
                bio: bio,
                projects: projects
            }
        })

        return res.json(user)
    }
}