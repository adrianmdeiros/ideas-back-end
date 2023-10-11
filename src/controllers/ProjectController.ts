import { Request, Response } from "express";
import { database } from "../database";

export class ProjectController{
    async create(req: Request, res: Response){
        const { title, description, studentsRequired } = req.body
        const { userId, categoryId } = req.params
         
        const userIdInt = parseInt(userId)
        const categoryIdInt = parseInt(categoryId)

        try{
            const savedProject = await database.project.create({
                data: {
                    title,
                    description,
                    studentsRequired,
                    user:{
                        connect: {
                            id: userIdInt
                        }
                    },
                    category: {
                        connect: {
                            id: categoryIdInt
                        }
                    }
                }
            })
    
            return res.status(201).json(savedProject)
        }catch(err){
            return res.status(409).json({
                error: "User already exists!"
            }
            )
        }
        
    }

    async read(req: Request, res: Response){
        const projects = await database.project.findMany()
        return res.status(200).json(projects)
    }

    async readProjectsByCategory(req: Request, res: Response){
        const { categoryId } = req.params

        const categoryIdInt = parseInt(categoryId) 

        const projectsByCategory = await database.project.findMany({
            where: {
                categoryId: categoryIdInt
            }
        })  
        return res.status(200).json(projectsByCategory)
    }

    async update(req: Request, res: Response){
        const { title, description, studentsRequired } = req.body
        const { id } = req.params

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

        return res.status(200).json(updatedProject)
    }
    
    async delete(req: Request, res: Response){
        const { id } = req.params

        const deletedProject = await database.project.delete({
            where: {
                id
            }
        })

        return res.status(200).json(deletedProject)
    }
}