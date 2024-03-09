
import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'
import { FindAllCategoriesService } from "../services/FindAllCategoriesService";
import { CategoryRepository } from "../repositories/CategoryRepository";

export class CategoryController {
    async read(req: Request, res: Response) {
        
        const categoryService = new FindAllCategoriesService(new CategoryRepository())
        const categories = await categoryService.all()

        return res.status(StatusCodes.OK).json(categories)
    }
}