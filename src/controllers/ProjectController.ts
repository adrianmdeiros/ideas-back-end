import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from 'http-status-codes'
import { ApiError } from "../helpers/ApiError";

export class ProjectController {
    async create(req: Request, res: Response) {
        const { title, description, studentsRequired, userid, categoryid } = req.body

        if (!userid || !categoryid) {
            throw new ApiError('userid or categoryid is missing!', StatusCodes.BAD_REQUEST)
        }

        const savedProject = await database.project.create({
            data: {
                title,
                description,
                studentsRequired,
                user: {
                    connect: {
                        id: userid,
                    }
                },
                category: {
                    connect: {
                        id: categoryid
                    }
                }
            }
        })

        const requestToCreateAPost = await database.project.findUnique({
            where: {
                id: savedProject.id
            },
            select: {
                id: true,
                title: true,
                description: true,
                studentsRequired: true,
                category: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatarURL: true,
                        course: true
                    }
                }
            }
        })

        return res.status(StatusCodes.CREATED).json(requestToCreateAPost)
    }

    async read(req: Request, res: Response) {
        const { userid } = req.query
        const { categoryid } = req.query
        const { usercourseid } = req.query

        if (userid) {
            const projectsByUser = await database.project.findMany({
                where: {
                    user: {
                        id: Number(userid)
                    }
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    studentsRequired: true,
                    category: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatarURL: true,
                            course: true
                        }
                    }
                }
            })

            if (projectsByUser.length === 0) {
                throw new ApiError('Cannot find projects for this user.', StatusCodes.NOT_FOUND)
            }

            return res.status(StatusCodes.OK).json(projectsByUser)
        }

        if (usercourseid) {
            const projectsByUserCourse = await database.project.findMany({
                where: {
                    user: {
                        course: {
                            id: Number(usercourseid)
                        }
                    }
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    studentsRequired: true,
                    category: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatarURL: true,
                            course: true,
                        }
                    }
                }
            })

            if (projectsByUserCourse.length === 0) {
                throw new ApiError("Cannor find projects for this usercourse.", StatusCodes.NOT_FOUND)
            }

            return res.status(StatusCodes.OK).json(projectsByUserCourse)
        }


        if(categoryid){
            const projectsByCategory = await database.project.findMany({
                where: {
                    category: {
                        id: Number(categoryid)
                    }
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    studentsRequired: true,
                    category: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatarURL: true,
                            course: true
                        }
                    }
                }
            })
    
            if (projectsByCategory.length === 0) {
                throw new ApiError('Cannot find projects for this category.', StatusCodes.NOT_FOUND)
            }
    
            return res.status(StatusCodes.OK).json(projectsByCategory)
        }
        
        const projects = await database.project.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                studentsRequired: true,
                category: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatarURL: true,
                        course: true
                    }
                }
            }
        })

        if (projects.length === 0) {
            throw new ApiError("Cannot find any projects.", StatusCodes.NOT_FOUND)
        } else {
            return res.status(StatusCodes.OK).json(projects)
        }
        
    }

    async update(req: Request, res: Response) {
        const { title, description, studentsRequired } = req.body
        const { id } = req.params

        const updatedProject = await database.project.update({
            where: {
                id
            },
            data: {
                title,
                description,
                studentsRequired
            }
        })

        const requestToUpdatedPost = await database.project.findUnique({
            where: {
                id: updatedProject.id
            },
            select: {
                id: true,
                title: true,
                description: true,
                studentsRequired: true,
                category: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatarURL: true,
                        course: true
                    }
                }
            }
        })

        return res.status(StatusCodes.OK).json(requestToUpdatedPost)
       
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const deletedProject = await database.project.delete({
            where: {
                id
            }
        })

        return res.status(StatusCodes.OK).json(deletedProject)
    
    }
}
