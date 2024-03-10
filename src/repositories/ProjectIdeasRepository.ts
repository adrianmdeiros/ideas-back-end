import { StatusCodes } from "http-status-codes";
import { database } from "../database";
import { ApiError } from "../helpers/ApiError";
import { isListEmpty } from "../utils/isListEmpty";
import { ProjectIdea } from "../types/ProjectIdea";
import { ProjectIdeaToUpdate } from "../types/ProjectIdeaToUpdate";
// import { Modality } from "../types/Modality";
// import { Category } from "../types/Category";


export class ProjectIdeasRepository {
    private queryTemplate = {
        title: true,
        description: true,
        studentsRequired: true,
        modality: {
            select: {
                name: true
            }
        },
        category: {
            select: {
                name: true
            }
        },
        servant: {
            select: {
                department: {
                    select: {
                        name: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        phone: true,
                        email: true,
                    }
                }
            }
        }
    }

    public async findAll() {
        const projects = await database.project.findMany({
            select: this.queryTemplate
        })

        if (isListEmpty(projects)) {
            throw new ApiError("Can't find any project ideas.", StatusCodes.NOT_FOUND)
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
            throw new ApiError("Can't find any project for this id.", StatusCodes.NOT_FOUND)
        }

        return projectById
    }

    public async findByServant(id: number) {
        const projectIdeasByServent = await database.project.findMany({
            where: {
                servant: {
                    servantId: id
                }
            },
            select: {
                id: true,
                ...this.queryTemplate
            }
        })

        if (isListEmpty(projectIdeasByServent)) {
            throw new ApiError(
                "Can't find projects for this user.",
                StatusCodes.NOT_FOUND
            )
        }
        return projectIdeasByServent

    }

    public async create(projectIdea: ProjectIdea) {
        const createdProjectIdea = await database.project.create({
            data: {
                title: projectIdea.title,
                description: projectIdea.description,
                studentsRequired: projectIdea.studentsRequired,
                modality: {
                    connect: {
                        name: projectIdea.modality
                    }
                },
                category: {
                    connect: {
                        name: projectIdea.category,
                    }
                },
                servant: {
                    connect: {
                        servantId: projectIdea.servantId
                    }
                }
            },
            select: {
                id: true,
                ...this.queryTemplate
            }
        })

        return createdProjectIdea
    }

    public async update(id: string, projectIdea: ProjectIdeaToUpdate) {
        const updatedProjectIdea = await database.project.update({
            where: {
                id: id
            },
            data: {
                title: projectIdea.title,
                description: projectIdea.description,
                studentsRequired: projectIdea.studentsRequired,
                modality: {
                    connect: {
                        name: projectIdea.modality
                    }
                },
                category: {
                    connect: {
                        name: projectIdea.category
                    }
                }

            },
            select: {
                id: true,
                ...this.queryTemplate
            }
        })

        return updatedProjectIdea
    }

    public async delete(id: string) {
        const deletedProject = await database.project.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                ...this.queryTemplate
            }
        })

        return deletedProject
    }

    // public async findByModality(modality: Modality) {
    //     const projectsByModality = await database.project.findMany({
    //         where: {
    //             modality: {
    //                 name: modality.name
    //             }
    //         },
    //         select: this.queryTemplate
    //     })
    //     if (isListEmpty(projectsByModality)) {
    //         throw new ApiError("Can't find projects for this modality.", StatusCodes.NOT_FOUND)
    //     }
    //     return projectsByModality

    // }

    // public async findByCategory(category: Category) {
    //     const projectIdeasByCategory = await database.project.findMany({
    //         where: {
    //             category: {
    //                 name: category.name
    //             }
    //         },
    //         select: this.queryTemplate,
    //     })

    //     if (isListEmpty(projectIdeasByCategory)) {
    //         throw new ApiError("Can't find projects for this category.", StatusCodes.NOT_FOUND)
    //     }

    //     return projectIdeasByCategory
    // }



}