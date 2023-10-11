import { Request, Response } from "express";
import { database } from "../database";

export class ProjectController{
    async create(req: Request, res: Response){
        const { title, description, studentsRequired, userId, categoryId } = req.body


        const savedProject = await database.project.create({
            data: {
                title,
                description,
                studentsRequired,
                user:{
                    connect: {
                        id: userId
                    }
                },
                projectCategory: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })

        return res.status(201).json(savedProject)
    }

    async read(req: Request, res: Response){
        const projects = await database.project.findMany()
        res.status(200).json(projects)
    }

    async update(req: Request, res: Response){
        const { title, description, studentsRequired, user, projectCategory } = req.body
        const { id } = req.params

        const updatedProject = await database.project.update({
            where: {
                id
            },
            data:{
                title,
                description,
                studentsRequired,
                user,
                projectCategory
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