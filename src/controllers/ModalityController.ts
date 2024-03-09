import { Request, Response } from "express";
import { ModalityRepository } from "../repositories/ModalityRepository";
import { FindAllModalitiesService } from "../services/FindAllModalitiesService";
import { StatusCodes } from "http-status-codes";

export class ModalityController{
    async read(req: Request, res: Response){
        const findAllModalitiesService = new FindAllModalitiesService(new ModalityRepository())
        const allDepartments = await findAllModalitiesService.all()

        return res.status(StatusCodes.OK).json(allDepartments)
    }
}