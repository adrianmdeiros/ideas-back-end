import { ProjectRepository } from "../repositories/ProjectRepository";

export class ProjectService {
    constructor(
        private projectRepository: ProjectRepository
    ) { }

    public async findBy(usercourseid: number, categoryid: number, take: number, skip: number) {  
        return await this.projectRepository.findByUserCourseAndCategoryId(usercourseid, categoryid, take, skip)
    }

    public async findByUser(id: number, take: number, skip: number) {
        return await this.projectRepository.findByUser(id, take, skip)
    }

    public async findByUserCourseId(id: number, take: number, skip: number) {
        return await this.projectRepository.findByUserCourseId(id, take, skip)
    }

}