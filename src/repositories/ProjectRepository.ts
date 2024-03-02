import { StatusCodes } from "http-status-codes";
import { database } from "../database";
import { ApiError } from "../helpers/ApiError";
import { isListEmpty } from "../utils/isListEmpty";
import { Project } from "../types/Project";


export class ProjectRepository {
    private queryTemplate = {
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
    }

    public async all(take: number, skip: number) {
        const projects = await database.project.findMany({
            select: this.queryTemplate,
            take,
            skip
        })

        if (isListEmpty(projects)) {
            throw new ApiError("Cannot find any projects.", StatusCodes.NOT_FOUND)
        }

        return projects

    }


    public async findById(id: string) {
        const project = await database.project.findFirst({
            where: {
                id: id
            },
            select: this.queryTemplate
        })

        if (!project) {
            throw new ApiError('Cannot find any project for this id.', StatusCodes.NOT_FOUND)
        }

        return project
    }

    public async findByUser(id: number, take: number, skip: number) {
        const projects = await database.project.findMany({
            where: {
                user: {
                    id: id
                }
            },
            select: {
                id: true,
                ...this.queryTemplate
            },
            take,
            skip
        })

        if (isListEmpty(projects)) {
            throw new ApiError(
                'Cannot find projects for this user.',
                StatusCodes.NOT_FOUND
            )
        }

        return projects
    }

    public async findByUserCourseId(id: number, take: number, skip: number) {
        const projects = await database.project.findMany({
            where: {
                user: {
                    course: {
                        id: id
                    }
                }
            },
            select: this.queryTemplate,
            take,
            skip
        })

        if (isListEmpty(projects)) {
            throw new ApiError(
                "Cannor find projects for this usercourse.",
                StatusCodes.NOT_FOUND
            )
        }

        return projects
    }

    public async findByUserCourseAndCategoryId(usercourseid: number, categoryid: number, take: number, skip: number) {
        const projects = await database.project.findMany({
            where: {
                user: {
                    course: {
                        id: usercourseid
                    }
                },
                AND: {
                    category: {
                        id: categoryid
                    }
                }
            },
            select: this.queryTemplate,
            take,
            skip
        })

        if (isListEmpty(projects)) {
            throw new ApiError(
                "Cannot find projects for this category for your course.",
                StatusCodes.NOT_FOUND
            )
        }

        return projects
    }
    public async findByModality(modality: string, take: number, skip: number) {
        const projects = await database.project.findMany({
            where: {
                modality: modality.toString()
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
                        id: true,
                        name: true,
                        course: true,
                        email: true,
                        phone: true
                    }
                }
            },
            take,
            skip
        })
        if (isListEmpty(projects)) {
            throw new ApiError('Cannot find projects for this modality.', StatusCodes.NOT_FOUND)
        }
        return projects
    }

    public async save(project: Project) {
        const savedProject = await database.project.create({
            data: {
                title: project.title,
                description: project.description,
                studentsRequired: project.studentsRequired,
                modality: project.modality,
                user: {
                    connect: {
                        id: project.userid,
                    }
                },
                category: {
                    connect: {
                        id: project.categoryid
                    }
                }
            },
            select: this.queryTemplate
        })
        return savedProject
    }
}