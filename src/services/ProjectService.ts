import { Project } from "../types/Project";
import { ProjectRepository } from "../repositories/ProjectRepository";

export class ProjectService {
    constructor(
        private projectRepository: ProjectRepository
    ) { }

    public async all(){
        return await this.projectRepository.findAll()
    }

    public async findById(id: string){
        return await this.projectRepository.findById(id)
    }
    
    public async findBy(usercourseid: number, categoryid: number, 
        take: number, skip: number) {  
        return await this.projectRepository
        .findByUserCourseAndCategoryId(usercourseid, categoryid, take, skip)
    }

    public async findByUser(id: number, take: number, skip: number) {
        return await this.projectRepository.findByUser(id, take, skip)
    }

    public async findByUserCourse(id: number, take: number, skip: number) {
        return await this.projectRepository.findByUserCourse(id, take, skip)
    }

    public async findByModality(modality: string, take: number, skip: number) {
        return await this.projectRepository.findByModality(modality, take, skip)
    }

    public async findByCategory(id: number, take: number, skip: number){
        return await this.projectRepository.findByCategory(id, take, skip)
    }

    public async create(project: Project){
        return await this.projectRepository.create(project)
    }

    public async update(id: string, project: Project){
        return await this.projectRepository.update(id, project)
    }

    public async delete(id: string){
        return await this.projectRepository.delete(id)
    }

}