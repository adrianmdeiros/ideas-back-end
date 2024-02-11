import { Request, Response } from "express";
import { database } from "../database";
import { StatusCodes } from 'http-status-codes'
import { ApiError } from "../helpers/ApiError";

export class ProjectController {
    async create(req: Request, res: Response) {
        const { title, description, studentsRequired, modality, userid, categoryid } = req.body

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

        const requestToCreateAPost = await database.project.findUnique({
            where: {
                id: savedProject.id
            },
            select: {
                id: true,
                title: true,
                description: true,
                studentsRequired: true,
                modality: true,
                amountUsersInterested: true,
                category: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        course: true
                    }
                }
            }
        })

        return res.status(StatusCodes.CREATED).json(requestToCreateAPost)
    }                       

    async read(req: Request, res: Response) {
        const { id } = req.params
        const { userid } = req.query
        const { categoryid } = req.query
        const { usercourseid } = req.query
        const { modality } = req.query
        

        if(usercourseid && categoryid) {
            const projectsByUserCourseAndCategoryId = await database.project.findMany({
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
                    amountUsersInterested: true,
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
                }
            })
            if (projectsByUserCourseAndCategoryId.length === 0) {
                throw new ApiError('Cannot find projects for this category for your course.', StatusCodes.NOT_FOUND)
            }
            return res.status(StatusCodes.OK).json(projectsByUserCourseAndCategoryId)
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
                    amountUsersInterested: true,
                    category: true,
                    user: {
                        select: { 
                            name: true,
                            course: true
                        }
                    }
                }
            })

            if(!projectById){
                throw new ApiError('Cannot find any project for this id.', StatusCodes.NOT_FOUND)
            }
            return res.status(StatusCodes.OK).json(projectById)
        }

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
                    modality: true,
                    amountUsersInterested: true,
                    category: {
                        select:{
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
                    title: true,
                    description: true,
                    studentsRequired: true,
                    modality: true,
                    amountUsersInterested: true,
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
                    title: true,
                    description: true,
                    studentsRequired: true,
                    modality: true,
                    amountUsersInterested: true,
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
                }
            })
    
            if (projectsByCategory.length === 0) {
                throw new ApiError('Cannot find projects for this category.', StatusCodes.NOT_FOUND)
            }
    
            return res.status(StatusCodes.OK).json(projectsByCategory)
        }
        
        if(modality){
            const projectsByModality = await database.project.findMany({
                where:{
                    modality: modality.toString()
                },
                select:{
                    title: true,
                    description: true,
                    studentsRequired: true,
                    modality: true,
                    amountUsersInterested: true,
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
                }
            })
            if (projectsByModality.length === 0) {
                throw new ApiError('Cannot find projects for this modality.', StatusCodes.NOT_FOUND)
            }
            return res.status(StatusCodes.OK).json(projectsByModality)

        }

        const projects = await database.project.findMany({
            select: {
                title: true,
                description: true,
                studentsRequired: true,
                modality: true,
                amountUsersInterested: true,
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
            }
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
        const { increment } = req.params

        if(increment && increment.toLowerCase() === 'increment'){
            const updatedAmountUsersInterested = await database.project.update({
                where: {
                    id
                },
                data: {
                    amountUsersInterested: { increment: 1 }
                }
            })

            const requestToUpdateAmountUsersInterestedInPost = await database.project.findUnique({
                where: {
                    id: updatedAmountUsersInterested.id
                },
                select: {
                    amountUsersInterested: true
                }   
            })

            const numericResponse = Number(requestToUpdateAmountUsersInterestedInPost?.amountUsersInterested)

            return res.status(StatusCodes.OK).json({ amountUsersInterested: numericResponse })

        }


        const updatedProject = await database.project.update({
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

        const requestToUpdatedPost = await database.project.findUnique({
            where: {
                id: updatedProject.id
            },
            select: {
                id: true,
                title: true,
                description: true,
                studentsRequired: true,
                modality: true,
                amountUsersInterested: true,
                category: {
                    select:{
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
