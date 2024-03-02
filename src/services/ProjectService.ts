import { Project } from "../types/Project";
import { ProjectRepository } from "../repositories/ProjectRepository";

export class ProjectService {
    constructor(
        private projectRepository: ProjectRepository
    ) { }

    public async all(take: number, skip: number){
        return await this.projectRepository.all(take, skip)
    }

    public async findById(id: string){
        return await this.projectRepository.findById(id)
    }
    
    public async findBy(usercourseid: number, categoryid: number, take: number, skip: number) {  
        return await this.projectRepository.findByUserCourseAndCategoryId(usercourseid, categoryid, take, skip)
    }

    public async findByUser(id: number, take: number, skip: number) {
        return await this.projectRepository.findByUser(id, take, skip)
    }

    public async findByUserCourseId(id: number, take: number, skip: number) {
        return await this.projectRepository.findByUserCourseId(id, take, skip)
    }

    public async findByModality(modality: string, take: number, skip: number) {
        return await this.projectRepository.findByModality(modality, take, skip)
    }

    public async save(project: Project){
        return await this.projectRepository.save(project)
    }

}