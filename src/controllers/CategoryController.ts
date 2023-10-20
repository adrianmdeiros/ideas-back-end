
import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from 'http-status-codes'

export class CategoryController {
    async create(req: Request, res: Response){
    const { name } = req.body;

    try{
        const newCategory = await database.category.create({
            data: { 
                name
            }
        })

        return res.status(StatusCodes.CREATED).json(newCategory);
    }
    catch(e) {
        return res.status(StatusCodes.CONFLICT).send({
            messsage: "Category already exists!"
        })
    }
    }
    
    async read(req: Request, res: Response){
        try{
            const categories = await database.category.findMany({
                orderBy:{
                    id: 'asc'
                }
            })
            if(categories.length === 0){
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: 'Cannor find categories!'
                })
            }
            return res.status(StatusCodes.OK).json(categories)
        }catch(err){
            
        }
    }

    async update(req: Request, res: Response){
        const { id } = req.params
        const { name, color } = req.body
        const categoryIdInt = parseInt(id)

        try{
            const updatedCategories = await database.category.update({
                where: {
                    id: categoryIdInt
                },
                data:{
                    name,
                    color
                }
            })
            return res.send(StatusCodes.OK).json()
        }catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json()
        }
    }

}