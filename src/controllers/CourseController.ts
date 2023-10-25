import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from "http-status-codes";


export class CourseController {

    async read(req: Request, res: Response){
        try{
            const courses = await database.course.findMany({
                orderBy: {
                    id: 'asc'
                }
            })

            if(courses.length === 0){
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Cannot find courses!"
                })
            }
            return res.status(StatusCodes.OK).json(courses)
        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
        }
    }

}