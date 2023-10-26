import { Response, Request } from 'express'
import { database } from '../database'
import { StatusCodes } from 'http-status-codes'
import { ApiError } from '../helpers/ApiError'

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
        
        if(!id){
            throw new ApiError('ID is required.', StatusCodes.BAD_REQUEST)
        }
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
        
    }

    async read(req: Request, res: Response){
    const { id } = req.params

    if(id){
        const userByid = await database.user.findFirst({
            where: {
                id: Number(id)
            }
        })
        return res.status(StatusCodes.OK).json(userByid)
    }
    
            const users = await database.user.findMany({
                select:{
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    avatarURL: true,
                    bond: true,
                    courseId: false,
                    course: true
                }
            })
            if(users.length === 0){
                throw new ApiError('Cannot find users.', StatusCodes.NOT_FOUND)
            }
            return res.status(StatusCodes.OK).json(users)
        
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
                throw new ApiError('Cannot find user contacts.', StatusCodes.NOT_FOUND)
            }
            return res.status(StatusCodes.OK).json(userContacts)
        }catch(e){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)  
        }
    }

    async update(req: Request, res: Response){
    const { email, phone } = req.body
    const { id } = req.params
        
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
        
    }

}