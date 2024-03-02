import { StatusCodes } from "http-status-codes"
import { database } from "../database"
import { ApiError } from "../helpers/ApiError"
import { isListEmpty } from "../utils/isListEmpty"

export class CategoryRepository{
    public async findAll(){
        const allCategories = await database.category.findMany({
            orderBy: {
                id: 'desc'
            }
        })

        if (isListEmpty(allCategories)) {
            throw new ApiError('Cannot find categories.', StatusCodes.NOT_FOUND)
        }
        
        return allCategories
    }
}