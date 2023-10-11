
import { Request, Response } from "express";
import { database } from "../database";

export class CategoryController {
    async create(req: Request, res: Response){
        const { name } = req.body;

        const newCategory = await database.category.create({
            data: { 
                name
            }
        })
        return res.status(201).json(newCategory);
    }

    async read(req: Request, res: Response){
        const categories = await database.category.findMany()
        return res.status(200).json(categories)
    }
}