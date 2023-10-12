import { Response, Request } from 'express'
import { database } from '../database'
import { StatusCodes } from 'http-status-codes'

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
        const { id, name, email, phone, avatarURL, bond, bio } = req.body
        
        try{
            const user = await database.user.create({
                data: {
                    id,
                    name,
                    email,
                    phone,
                    avatarURL,
                    bond,
                    bio,
                }
            })
            return res.status(StatusCodes.CREATED).json(user)
        }catch(e){
            return res.status(StatusCodes.CONFLICT).json({
                message: 'User already exists!'
            })
        }
    }

    async read(req: Request, res: Response){
        try{
            const users = await database.user.findMany()
            if(users.length === 0){
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Cannot find users!"
                })
            }
            return res.status(StatusCodes.OK).json(users)
        }catch(e){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json()  
        }
    }

}