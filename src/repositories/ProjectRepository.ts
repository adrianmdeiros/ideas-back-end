import { StatusCodes } from "http-status-codes";
import { database } from "../database";
import { ApiError } from "../helpers/ApiError";

export class ProjectRepository {
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
                        course: true,
                        email: true,
                        phone: true
                    }
                }
            },
            take,
            skip
        })

        if (projects.length === 0) {
            throw new ApiError('Cannot find projects for this category for your course.', StatusCodes.NOT_FOUND)
        }

        return projects
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
                        course: true,
                        email: true,
                        phone: true
                    }
                }
            },
            take,
            skip
        })

        if (projects.length === 0) {
            throw new ApiError('Cannot find projects for this user.', StatusCodes.NOT_FOUND)
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
                        course: true,
                        phone: true,
                        email: true
                    }
                }
            },
            take,
            skip
        })

        if (projects.length === 0) {
            throw new ApiError("Cannor find projects for this usercourse.", StatusCodes.NOT_FOUND)
        }

        return projects
    }

    
}