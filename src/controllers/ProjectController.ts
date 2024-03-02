import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from 'http-status-codes'
import { ApiError } from "../helpers/ApiError";
import { ProjectService } from "../services/ProjectService";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";

export class ProjectController {
    public async create(req: Request, res: Response) {
        const { title, description, studentsRequired, modality, userid, categoryid } = req.body

        if (!userid || !categoryid) {
            throw new ApiError('userid or categoryid is missing!', StatusCodes.BAD_REQUEST)
        }

        const userService = new UserService(new UserRepository)
        const user = await userService.findById(userid)
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

        const savedProject = await projectService.save(projectIdea)

        return res.status(StatusCodes.CREATED).json(savedProject)
    }

    public async read(req: Request, res: Response) {
        const { id } = req.params
        const { userid, categoryid, usercourseid, modality } = req.query
        const skip = req.query.skip ?? 0
        const take = req.query.take ?? 12

        const projectService = new ProjectService(new ProjectRepository())

        if (usercourseid && categoryid) {
            const projectsByUserCourseAndCategory = await projectService.findBy(Number(usercourseid), Number(categoryid), Number(take), Number(skip))
            return res.status(StatusCodes.OK).json(projectsByUserCourseAndCategory)
        }

        if (id) {
            const projectById = await projectService.findById(id)
            return res.status(StatusCodes.OK).json(projectById)
        }

        if (userid) {
            const projectsByUserId = await projectService.findByUser(Number(userid), Number(take), Number(skip))
            return res.status(StatusCodes.OK).json(projectsByUserId)
        }

        if (usercourseid) {
            const projectsByUserCourseId = await projectService.findByUserCourseId(Number(usercourseid), Number(take), Number(skip))
            return res.status(StatusCodes.OK).json(projectsByUserCourseId)
        }


        if (categoryid) {
            const projectsByCategory = await database.project.findMany({
                where: {
                    category: {
                        id: Number(categoryid)
                    }
                },
                select: {
                    title: true,
                    description: true,
                    studentsRequired: true,
                    modality: true,
                    category: {
                        select: {
                            name: true,
                            color: true
                        }
                    },
                    user: {
                        select: {
                            name: true,
                            course: true
                        }
                    }
                },
                take: Number(take),
                skip: Number(skip)
            })

            if (projectsByCategory.length === 0) {
                throw new ApiError('Cannot find projects for this category.', StatusCodes.NOT_FOUND)
            }

            return res.status(StatusCodes.OK).json(projectsByCategory)
        }

        if (modality) {
            const projectsByModality = await projectService.findByModality(String(modality), Number(take), Number(skip))
            return res.status(StatusCodes.OK).json(projectsByModality)
        }

        const allProjectsIdeas = await projectService.all(Number(take), Number(skip))
        return res.status(StatusCodes.OK).json(allProjectsIdeas)

    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { title, description, studentsRequired, modality, categoryid } = req.body
        const skip = req.query.skip ?? 0
        const take = req.query.take ?? 12

        await database.project.update({
            where: {
                id
            },
            data: {
                title,
                description,
                studentsRequired,
                modality,
                categoryId: categoryid
            }
        })

        const [projectsList, totalProjects] = await database.$transaction([
            database.project.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    studentsRequired: true,
                    modality: true,
                    category: true,
                    user: {
                        select: {
                            name: true,
                            course: true,
                            email: true,
                            phone: true
                        }
                    }
                },
                skip: Number(skip),
                take: Number(take)
            }),
            database.project.count()
        ])

        const totalPages = Math.ceil(totalProjects / Number(take))

        return res.status(StatusCodes.OK).json({ totalProjects, totalPages, projectsList })
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        const skip = req.query.skip ?? 0
        const take = req.query.take ?? 12

        await database.project.delete({
            where: {
                id
            }
        })

        const [projectsList, totalProjects] = await database.$transaction([
            database.project.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    studentsRequired: true,
                    modality: true,
                    category: true,
                    user: {
                        select: {
                            name: true,
                            course: true,
                            email: true,
                            phone: true
                        }
                    }
                },
                skip: Number(skip),
                take: Number(take)
            }),
            database.project.count()
        ])

        const totalPages = Math.ceil(totalProjects) / Number(take)

        return res.status(StatusCodes.OK).json({ totalProjects, totalPages, projectsList })

    }
}
