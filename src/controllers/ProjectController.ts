import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from 'http-status-codes'

export class ProjectController{
    async create(req: Request, res: Response){
        const { title, description, studentsRequired, userId, categoryId } = req.body
        
        try{
            const savedProject = await database.project.create({
                data: {
                    title,
                    description,
                    studentsRequired,
                    user:{
                        connect: {
                            id: userId,
                        }
                    },
                    category: {
                        connect: {
                            id: categoryId
                        }
                    }
                }
            })
    
            return res.status(StatusCodes.CREATED).json(savedProject)
        }catch(err){
            if(userId === null || categoryId === null){
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "userId and categoryId are required!"
                })
            }
            return res.status(StatusCodes.CONFLICT).json({
                message: "Project already exists!"
            }
            )
        }
        
    }

    async read(req: Request, res: Response){
        const { categoryId } = req.query

        if (categoryId !== undefined && typeof categoryId === 'string'){
            const categoryIdInt = parseInt( categoryId )

            if(!isNaN(categoryIdInt)){
                try{
                    const projectsByCategory = await database.project.findMany({
                        where: {
                            category:{
                                id: categoryIdInt
                            }
                        }, 
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            studentsRequired: true,
                            category: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    avatarURL: true
                                }
                            }     
                        }
                    })  

                    if(projectsByCategory.length === 0){
                        return res.status(StatusCodes.NOT_FOUND).json({
                            message: "Category doesn't exists or has no projects!"
                        })
                    }
                    return res.status(StatusCodes.OK).json(projectsByCategory)
                    
                }catch(e){
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json()
                }
            }
        }

        try{
            const projects = await database.project.findMany({
                select:{
                    id: true,
                    title: true,
                    description: true,
                    studentsRequired: true,
                    category: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatarURL: true
                        }
                    }
                }
            })
            if(projects.length === 0){
                return res.status(StatusCodes.NOT_FOUND).json()
            }
            return res.status(StatusCodes.OK).json(projects)
        }catch(e){  
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json()
        }   

        

    }


    async update(req: Request, res: Response){
        const { title, description, studentsRequired } = req.body
        const { id } = req.params

        try{
            const updatedProject = await database.project.update({
                where: {
                    id
                },
                data:{
                    title,
                    description,
                    studentsRequired
                }
            })
    
            return res.status(StatusCodes.OK).json(updatedProject)
        }catch(e){
            return res.status(StatusCodes.BAD_REQUEST).json()
        }
    }
    
    async delete(req: Request, res: Response){
        const { id } = req.params
        try {
            const deletedProject = await database.project.delete({
                where: {
                    id
                }
            })
    
            return res.status(StatusCodes.OK).json(deletedProject)
        } catch (e) {
            return res.status(StatusCodes.BAD_REQUEST).json()
        }
    }
}