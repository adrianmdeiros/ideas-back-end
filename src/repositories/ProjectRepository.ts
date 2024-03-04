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

    public async findAll() {
        const projects = await database.project.findMany({
            select: this.queryTemplate
        })

        if (isListEmpty(projects)) {
            throw new ApiError("Cannot find any projects.", StatusCodes.NOT_FOUND)
        }

        return projects

    }

    public async findById(id: string) {
        const projectById = await database.project.findFirst({
            where: {
                id: id
            },
            select: this.queryTemplate
        })

        if (!projectById) {
            throw new ApiError('Cannot find any project for this id.', StatusCodes.NOT_FOUND)
        }

        return projectById
    }

    public async findByUser(id: number, take: number, skip: number) {
        const projectsByUser = await database.project.findMany({
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

        if (isListEmpty(projectsByUser)) {
            throw new ApiError(
                'Cannot find projects for this user.',
                StatusCodes.NOT_FOUND
            )
        }

        return projectsByUser
    }

    public async findByUserCourse(id: number, take: number, skip: number) {
        const projectsByUserCourse = await database.project.findMany({
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

        if (isListEmpty(projectsByUserCourse)) {
            throw new ApiError(
                "Cannor find projects for this usercourse.",
                StatusCodes.NOT_FOUND
            )
        }

        return projectsByUserCourse
    }

    public async findByUserCourseAndCategoryId(usercourseid: number, categoryid: number, take: number, skip: number) {
        const projectsByUserCourseAndCategory = await database.project.findMany({
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

        if (isListEmpty(projectsByUserCourseAndCategory)) {
            throw new ApiError(
                "Cannot find projects for this category on this course.",
                StatusCodes.NOT_FOUND
            )
        }

        return projectsByUserCourseAndCategory
    }

    public async findByModality(modality: string, take: number, skip: number) {
        const projectsByModality = await database.project.findMany({
            where: {
                modality: String(modality).toLowerCase()
            },
            select: this.queryTemplate,
            take,
            skip
        })
        if (isListEmpty(projectsByModality)) {
            throw new ApiError('Cannot find projects for this modality.', StatusCodes.NOT_FOUND)
        }
        return projectsByModality
    }

    public async findByCategory(id: number, take: number, skip: number) {
        const projectsByCategory = await database.project.findMany({
            where: {
                category: {
                    id: id
                }
            },
            select: this.queryTemplate,
            take,
            skip
        })

        if (isListEmpty(projectsByCategory)) {
            throw new ApiError('Cannot find projects for this category.', StatusCodes.NOT_FOUND)
        }

        return projectsByCategory
    }

    public async create(project: Project) {
        const createdProject = await database.project.create({
            data: {
                title: project.title,
                description: project.description,
                studentsRequired: project.studentsRequired,
                modality: project.modality.toLowerCase(),
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
        return createdProject
    }

    public async update(id: string, project: Project) {
        const updatedProject = await database.project.update({
            where: {
                id: id
            },
            data: {
                title: project.title,
                description: project.description,
                studentsRequired: project.studentsRequired,
                modality: project.modality,
                categoryId: project.categoryid
            },
            select: {
                id: true,
                ...this.queryTemplate
            }
        })

        return updatedProject
    }

    public async delete(id: string) {
        const deletedProject = await database.project.delete({
            where: {
                id
            },
            select: this.queryTemplate
        })

        return deletedProject
    }

    public async findByUserCourseAndModality(usercourseid: number, modality: string, take: number, skip: number) {
        const projectsByUserCourseAndModality = await database.project.findMany({
            where: {
                user: {
                    course: {
                        id: usercourseid
                    }
                },
                AND: {
                    modality: String(modality).toLowerCase()
                }
            },
            select: this.queryTemplate,
            take,
            skip
        })
        return projectsByUserCourseAndModality
    }

    public async findByUserCourseAndCategoryAndModality(usercourseid: number, categoryid: number, modality: String, take: number, skip: number) {
        const projectsByUserCourseAndCategoryAndModality = await database.project.findMany({
            where: {
                user: {
                    course: {
                        id: usercourseid
                    }
                },
                AND: {
                    category: {
                        id: categoryid
                    },
                    modality: String(modality).toLowerCase()
                },
            },
            select: this.queryTemplate,
            take,
            skip
        })
        return projectsByUserCourseAndCategoryAndModality
    }

}