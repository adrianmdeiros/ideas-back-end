
import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from 'http-status-codes'
import { ApiError } from "../helpers/ApiError";

export class CategoryController {
    async create(req: Request, res: Response){
    const { name, color } = req.body;

    
        const newCategory = await database.category.create({
            data: { 
                name,
                color
            }
        })

        return res.status(StatusCodes.CREATED).json(newCategory);
    
    
    }
    
    async read(req: Request, res: Response){
        
            const categories = await database.category.findMany({
                orderBy:{
                    id: 'asc'
                }
            })
            if(categories.length === 0){
                
               throw new ApiError('Cannot find categories.', StatusCodes.NOT_FOUND)
            }
            return res.status(StatusCodes.OK).json(categories)
        
    }

    async update(req: Request, res: Response){
        const { id } = req.params
        const { name, color } = req.body
        const categoryIdInt = parseInt(id)

            const updatedCategories = await database.category.update({
                where: {
                    id: categoryIdInt
                },
                data:{
                    name,
                    color
                }
            })
            return res.send(StatusCodes.OK).json(updatedCategories)
        
    }

}