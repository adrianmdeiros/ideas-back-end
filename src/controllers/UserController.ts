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
        const { id, name, email, phone, avatarURL, bond, course } = req.body
        
        try{
            const user = await database.user.create({
                data: {
                    id,
                    name,
                    email,
                    phone,
                    avatarURL,
                    bond,
                    course: {
                        connectOrCreate: {
                            where: {
                                name: course
                            },
                            
                            create: {
                                name: course
                            }
                        }
                    }
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

    async readContacts(req: Request, res: Response){
        const { id } = req.params
        try{
            const userContacts = await database.user.findFirst({
                where:{
                    id: Number(id)
                },
                select: {
                    email: true,
                    phone: true
                }
            })
            if(!userContacts){
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Cannot find users!"
                })
            }
            return res.status(StatusCodes.OK).json(userContacts)
        }catch(e){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json()  
        }
    }

    async update(req: Request, res: Response){
        const { email, phone } = req.body
        const { id } = req.params
        
        try{
            const updatedProject = await database.user.update({
                where: {
                    id: Number(id)
                },
                data:{
                    email,
                    phone
                }
            })
    
            return res.status(StatusCodes.OK).json(updatedProject)
        }catch(e){
            return res.status(StatusCodes.BAD_REQUEST).json()
        }
    }

}