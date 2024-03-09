import { Request, Response } from "express";
import { DepartmentRepository } from "../repositories/DepartmentRepository";
import { FindAllDepartmentsService } from "../services/FindAllDepartmentsService";
import { StatusCodes } from "http-status-codes";

export class DepartmentController{
    async read(req: Request, res: Response){
        const findAllDepartmentsService = new FindAllDepartmentsService(new DepartmentRepository())
        const allDepartments = await findAllDepartmentsService.all()

        return res.status(StatusCodes.OK).json(allDepartments)
    }
}