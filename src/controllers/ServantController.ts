import { Request, Response } from "express";
import { ServantRepository } from "../repositories/ServantRepository";
import { CreateServantService } from "../services/CreateServantService";
import { StatusCodes } from "http-status-codes";

export class ServantController {
    async create(req: Request, res: Response){
        const { id, name, email, phone, department } = req.body
        const servant = {
            id,
            name,
            email,
            phone,
            department
        }

        const servantService = new CreateServantService(new ServantRepository())
        const createdServant = await servantService.save(servant)

        return res.status(StatusCodes.CREATED).json(createdServant)
    }
}