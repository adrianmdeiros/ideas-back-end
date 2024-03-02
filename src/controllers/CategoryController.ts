
import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from 'http-status-codes'
import { ApiError } from "../helpers/ApiError";
import { FindAllCategoriesService } from "../services/FindAllCategoriesService";
import { CategoryRepository } from "../repositories/CategoryRepository";

export class CategoryController {
    async read(req: Request, res: Response) {
        
        const categoryService = new FindAllCategoriesService(new CategoryRepository())
        const categories = await categoryService.all()

        return res.status(StatusCodes.OK).json(categories)
    }
}