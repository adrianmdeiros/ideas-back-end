
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
        const categories = await database.category.findMany()
        return res.status(200).json(categories)
    }
}