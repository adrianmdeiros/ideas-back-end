import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from 'http-status-codes'

export class ProjectController {
    async create(req: Request, res: Response) {
        const { title, description, studentsRequired, userid, categoryid } = req.body


        try {
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
        } catch (err) {
            if (userid === null || categoryid === null) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "userid and categoryid are required!"
                })
            }
            return res.status(StatusCodes.CONFLICT).json({
                message: "Project already exists!"
            })
        }

    }

    async read(req: Request, res: Response) {
        const { userid } = req.query
        const { categoryid } = req.query
        const { usercourseid } = req.query

        if (userid) {
            try {
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
                            }
                        }
                    }
                })

                if (projectsByUser.length === 0) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        message: "User doesn't exists or has no projects!"
                    })
                }
                return res.status(StatusCodes.OK).json(projectsByUser)

            } catch (e) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
            }
        }
        
        if (usercourseid) {
            try {
                const projectsByUserCourse = await database.project.findMany({
                    where: {
                        user:{
                            course:{
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
                    return res.status(StatusCodes.NOT_FOUND).json({
                        message: "Course doesn't exists or has no projects!"
                    })
                }
                return res.status(StatusCodes.OK).json(projectsByUserCourse)

            } catch (e) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
            }
        }


        if (categoryid) {
            try {
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
                    return res.status(StatusCodes.NOT_FOUND).json({
                        message: "Category doesn't exists or has no projects!"
                    })
                }
                return res.status(StatusCodes.OK).json(projectsByCategory)

            } catch (e) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
            }
        }

        if(userid && usercourseid){
            try {
                const projectsByUserAndCourse = await database.project.findMany({
                    where:{
                        user: {
                            id: Number(userid),
                            AND:{
                                course: {
                                    id: Number(usercourseid)
                                }
                            }
                        }
                    }   
                })
                if (projectsByUserAndCourse.length === 0) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        message: "User or Course doesn't exists or has no projects!"
                    })
                }
                return res.status(StatusCodes.OK).json(projectsByUserAndCourse)

            } catch (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
            }
        }


        try {
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
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Cannot find projects!"
                })
            }
            return res.status(StatusCodes.OK).json(projects)
        } catch (e) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }


    }

    async update(req: Request, res: Response) {
        const { title, description, studentsRequired } = req.body
        const { id } = req.params

        try {
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
        } catch (e) {
            return res.status(StatusCodes.BAD_REQUEST).json()
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            const deletedProject = await database.project.delete({
                where: {
                    id
                }
            })

            return res.status(StatusCodes.OK).json(deletedProject)
        } catch (e) {
            return res.status(StatusCodes.BAD_REQUEST).json(e)
        }
    }
}
