import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../helpers/ApiError";


export class CourseController {

    async read(req: Request, res: Response){

            const courses = await database.course.findMany({
                orderBy: {
                    id: 'asc'
                }
            })

            if(courses.length === 0){
                throw new ApiError('Cannot find courses.', StatusCodes.NOT_FOUND)
            }
            return res.status(StatusCodes.OK).json(courses)
    }

}