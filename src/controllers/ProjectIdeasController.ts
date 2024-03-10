import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'
import { ApiError } from "../helpers/ApiError";
import { ProjectIdeasService } from "../services/ProjectIdeasService";
import { ProjectIdeasRepository } from "../repositories/ProjectIdeasRepository";
import { FindServantByIdService } from "../services/FindServantByIdService";
import { ServantRepository } from "../repositories/ServantRepository";

export class ProjectIdeasController {
    async create(req: Request, res: Response) {
        const { title, description, studentsRequired, modality, category, servantId } = req.body

        if (!servantId) {
            throw new ApiError('servantId is missing!', StatusCodes.BAD_REQUEST)
        }

        const findServantByIdService = new FindServantByIdService(new ServantRepository())

        const servant = await findServantByIdService.findById(servantId)

        if (!servant) {
            throw new ApiError("Servant doesn't exists.", StatusCodes.BAD_REQUEST)
        }

        const projectIdea = {
            title,
            description,
            studentsRequired,
            modality,
            category,
            servantId
        }

        const projectIdeasService = new ProjectIdeasService(new ProjectIdeasRepository())
        const savedProject = await projectIdeasService.create(projectIdea)

        return res.status(StatusCodes.CREATED).json(savedProject)
    }

    async read(req: Request, res: Response) {
        const { id, servantId } = req.query

        const projectIdeasService = new ProjectIdeasService(new ProjectIdeasRepository())

        if (id) {
            const projectIdeaById = await projectIdeasService.findById(String(id))
            return res.status(StatusCodes.OK).json(projectIdeaById)
        }

        if (servantId) {
            const projectIdeasByServant = await projectIdeasService
                .findByServant(Number(servantId))
            return res.status(StatusCodes.OK).json(projectIdeasByServant)
        }

        const allProjectIdeas = await projectIdeasService.all()

        return res.status(StatusCodes.OK).json(allProjectIdeas)

    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { title, description, studentsRequired, modality, category } = req.body

        const newDataProjectIdea = {
            title,
            description,
            studentsRequired,
            modality,
            category
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