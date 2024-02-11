
import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from 'http-status-codes'
import { ApiError } from "../helpers/ApiError";

export class CategoryController {
    async read(req: Request, res: Response) {
        const categories = await database.category.findMany({
            orderBy: {
                id: 'desc'
            }
        })
        if (categories.length === 0) {
            throw new ApiError('Cannot find categories.', StatusCodes.NOT_FOUND)
        }
        return res.status(StatusCodes.OK).json(categories)
    }
}