import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'
import { ApiError } from "../helpers/ApiError";
import { ProjectIdeasService } from "../services/ProjectIdeasService";
import { ProjectIdeasRepository } from "../repositories/ProjectIdeasRepository";
import { FindServantByIdService } from "../services/FindServantByIdService";
import { ServantRepository } from "../repositories/ServantRepository";

export class ProjectIdeasController {
    async create(req: Request, res: Response) {
        const { title, description, studentsRequired, modality, category, serventId } = req.body

        if (!serventId) {
            throw new ApiError('serventId is missing!', StatusCodes.BAD_REQUEST)
        }

        const servent = new FindServantByIdService(new ServantRepository())

        if (!servent) {
            throw new ApiError("Servent doesn't exists.", StatusCodes.BAD_REQUEST)
        }

        const projectIdea = {
            title,
            description,
            studentsRequired,
            modality,
            category,
            serventId
        }

        const projectIdeasService = new ProjectIdeasService(new ProjectIdeasRepository())
        const savedProject = await projectIdeasService.create(projectIdea)

        return res.status(StatusCodes.CREATED).json(savedProject)
    }

    async read(req: Request, res: Response) {
        const { id, serventId } = req.query

        const projectIdeasService = new ProjectIdeasService(new ProjectIdeasRepository())

        if (id) {
            const projectIdeaById = await projectIdeasService.findById(String(id))
            return res.status(StatusCodes.OK).json(projectIdeaById)
        }

        if (serventId) {
            const projectIdeasByServent = await projectIdeasService
                .findByServant(Number(serventId))
            return res.status(StatusCodes.OK).json(projectIdeasByServent)
        }

        const allProjectIdeas = await projectIdeasService.all()

        return res.status(StatusCodes.OK).json(allProjectIdeas)

    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { title, description, studentsRequired, modality, category, serventId } = req.body

        const newDataProjectIdea = {
            title,
            description,
            studentsRequired,
            modality,
            category,
            serventId
        }

        const projectIdeasService = new ProjectIdeasService(new ProjectIdeasRepository())
        const updatedProjectIdea = await projectIdeasService.update(id, newDataProjectIdea)

        return res.status(StatusCodes.OK).json(updatedProjectIdea)
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const projectIdeasService = new ProjectIdeasService(new ProjectIdeasRepository())
        const deletedProjectIdea = await projectIdeasService.delete(id)

        return res.status(StatusCodes.ACCEPTED).json(deletedProjectIdea)
    }
}