import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from 'http-status-codes'
import { ApiError } from "../helpers/ApiError";

export class ProjectController {
    async create(req: Request, res: Response) {
        const { title, description, studentsRequired, modality, userid, categoryid } = req.body
        const skip = req.query.skip ?? 0
        const take = req.query.take ?? 12

        if (!userid || !categoryid) {
            throw new ApiError('userid or categoryid is missing!', StatusCodes.BAD_REQUEST)
        }

        const user = await database.user.findFirst({
            where:{
                id: userid
            }
        })

        if(!user){
            throw new ApiError('User not found.', StatusCodes.NOT_FOUND)
        }

        const savedProject = await database.project.create({
            data: {
                title,
                description,
                studentsRequired,
                modality,
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

        const [projectsList, totalProjects] = await database.$transaction([
            database.project.findMany({
                where: {
                    id: savedProject.id
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    studentsRequired: true,
                    modality: true,
                    category: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            course: true
                        }
                    }
                },
                skip: Number(skip),
                take: Number(take)
            }),
            database.project.count()
        ])

        const totalPages = Math.ceil(totalProjects / Number(take))

        return res.status(StatusCodes.CREATED).json({ totalProjects, totalPages, projectsList })
    }                       

    async read(req: Request, res: Response) {
        const { id } = req.params
        const { userid, categoryid, usercourseid, modality } = req.query
        const skip = req.query.skip ?? 0
        const take = req.query.take ?? 12

        if(usercourseid && categoryid) {
            const [projectsList, totalProjects] = await database.$transaction([
            database.project.findMany({
                where:{
                    user:{
                        course:{
                            id: Number(usercourseid)                            
                        }
                    },
                    AND:{
                        category:{
                            id: Number(categoryid)
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
                            id: true,
                            name: true,
                            course: true
                        }
                    }
                },
                take: Number(take),
                skip: Number(skip)
            }),
            database.project.count()
        ]) 

            const totalPages = Math.ceil(totalProjects / Number(take))

            if (projectsList.length === 0) {
                throw new ApiError('Cannot find projects for this category for your course.', StatusCodes.NOT_FOUND)
            }
            return res.status(StatusCodes.OK).json({ totalProjects, totalPages, projectsList })
        }

        if(id){
            const projectById = await database.project.findFirst({
                where: {
                    id: id
                },
                select: {   
                    title: true,
                    description: true,
                    studentsRequired: true,
                    modality: true,
                    category: true,
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

            if(!projectById){
                throw new ApiError('Cannot find any project for this id.', StatusCodes.NOT_FOUND)
            }
            return res.status(StatusCodes.OK).json(projectById)
        }

        if (userid) {
            const [projectsList, totalProjects] = await database.$transaction([
                database.project.findMany({
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
                        modality: true,
                        category: {
                            select:{
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
                    take: Number(take),
                    skip: Number(skip)
                }),
                database.project.count()
            ])

            const totalPages = Math.ceil(totalProjects / Number(take))

            if (projectsList.length === 0) {
                throw new ApiError('Cannot find projects for this user.', StatusCodes.NOT_FOUND)
            }

            return res.status(StatusCodes.OK).json({ totalProjects, totalPages, projectsList })
        }

        if (usercourseid) {
            const [projectsList, totalProjects] = await database.$transaction([
                database.project.findMany({
                    where: {
                        user: {
                            course: {
                                id: Number(usercourseid)
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
                                id: true,
                                name: true,
                                course: true,
                                phone: true,
                                email: true
                            }
                        }
                    },
                    take: Number(take),
                    skip: Number(skip)
                }),
                database.project.count()
            ])
            
            const totalPages = Math.ceil(totalProjects / Number(take))
            
            if (projectsList.length === 0) {
                throw new ApiError("Cannor find projects for this usercourse.", StatusCodes.NOT_FOUND)
            }

            return res.status(StatusCodes.OK).json({ totalProjects, totalPages, projectsList })
        }


        if(categoryid){
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
        
        if(modality){
            const [projectsList, totalProjects] = await database.$transaction([
                database.project.findMany({
                    where:{
                        modality: modality.toString()
                    },
                    select:{
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
                                course: true
                            }
                        }
                    },
                    take: Number(take),
                    skip: Number(skip)
                }),
                database.project.count()
            ]) 
           
            const totalPages = Math.ceil(totalProjects / Number(take) )

            if (projectsList.length === 0) {
                throw new ApiError('Cannot find projects for this modality.', StatusCodes.NOT_FOUND)
            }
            return res.status(StatusCodes.OK).json({totalProjects, totalPages, projectsList})

        }

        const projects = await database.project.findMany({
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

        if (projects.length === 0) {
            throw new ApiError("Cannot find any projects.", StatusCodes.NOT_FOUND)
        } else {
            return res.status(StatusCodes.OK).json(projects)
        }
        
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
                            id: true,
                            name: true,
                            course: true
                        }
                    }
                },
                skip: Number(skip),
                take: Number(take)
            }),
            database.project.count()
        ])

        const totalPages = Math.ceil(totalProjects / Number(take))

        return res.status(StatusCodes.OK).json({ totalProjects, totalPages, projectsList})
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
                            id: true,
                            name: true,
                            course: true
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
