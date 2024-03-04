import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'
import { ApiError } from "../helpers/ApiError";
import { ProjectService } from "../services/ProjectService";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";

export class ProjectController {
    async create(req: Request, res: Response) {
        const { title, description, studentsRequired, modality, userid, categoryid } = req.body

        if (!userid || !categoryid) {
            throw new ApiError('userid or categoryid is missing!', StatusCodes.BAD_REQUEST)
        }

        const userService = new UserService(new UserRepository)
        const user = await userService.findBy(userid)

        if (!user) {
            throw new ApiError("User doesn't exists.", StatusCodes.BAD_REQUEST)
        }

        const projectIdea = {
            title,
            description,
            studentsRequired,
            modality,
            userid,
            categoryid
        }

        const projectService = new ProjectService(new ProjectRepository())
        const savedProject = await projectService.create(projectIdea)

        return res.status(StatusCodes.CREATED).json(savedProject)
    }

    async read(req: Request, res: Response) {
        const { id, userid, categoryid, usercourseid, modality } = req.query
        const skip = req.query.skip ?? 0
        const take = req.query.take ?? 12

        const projectService = new ProjectService(new ProjectRepository())

        if(usercourseid && categoryid && modality){
            const projects = await projectService.findByUserCourseAndCategoryAndModality(Number(usercourseid), Number(categoryid), String(modality), Number(take), Number(skip))
            return res.status(StatusCodes.OK).json(projects)
        }

        if (usercourseid && categoryid) {
            const projects = await projectService
                .findBy(Number(usercourseid), Number(categoryid), Number(take), Number(skip))
            return res.status(StatusCodes.OK).json(projects)
        }

        if(usercourseid && modality){
            const projects = await projectService.findByUserCourseAndModality(Number(usercourseid), String(modality), Number(take), Number(skip))
            return res.status(StatusCodes.OK).json(projects)
        }

        if (id) {
            const projects = await projectService.findById(String(id))
            return res.status(StatusCodes.OK).json(projects)
        }

        if (userid) {
            const projects = await projectService
                .findByUser(Number(userid), Number(take), Number(skip))
            return res.status(StatusCodes.OK).json(projects)
        }
        
        if (usercourseid) {
            const projects = await projectService
                .findByUserCourse(Number(usercourseid), Number(take), Number(skip))
            return res.status(StatusCodes.OK).json(projects)
        }

        if (categoryid) {
            const projects = await projectService
                .findByCategory(Number(categoryid), Number(take), Number(skip))
            return res.status(StatusCodes.OK).json(projects)
        }

        if (modality) {
            const projects = await projectService
                .findByModality(String(modality), Number(take), Number(skip))
            return res.status(StatusCodes.OK).json(projects)
        }

        
        const projects = await projectService.all()

        return res.status(StatusCodes.OK).json(projects)

    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { title, description, studentsRequired, modality, userid, categoryid } = req.body

        const projectIdea = {
            title,
            description,
            studentsRequired,
            modality,
            userid,
            categoryid
        }

        const projectService = new ProjectService(new ProjectRepository())
        const updatedProjectIdea = await projectService.update(id, projectIdea)

        return res.status(StatusCodes.OK).json(updatedProjectIdea)
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const projectService = new ProjectService(new ProjectRepository())
        const deletedProjectIdea = await projectService.delete(id)

        return res.status(StatusCodes.OK).json(deletedProjectIdea)
    }
}