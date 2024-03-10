import { ProjectIdea } from "../types/ProjectIdea";
import { ProjectIdeasRepository } from "../repositories/ProjectIdeasRepository";
import { ProjectIdeaToUpdate } from "../types/ProjectIdeaToUpdate";

export class ProjectIdeasService {
    constructor(
        private projectIdeasRepository: ProjectIdeasRepository
    ) { }

    public async all(){
        return await this.projectIdeasRepository.findAll()
    }

    public async findById(id: string){
        return await this.projectIdeasRepository.findById(id)
    }

    public async findByServant(id: number) {
        return await this.projectIdeasRepository.findByServant(id)
    }

    // public async findByModality(modality: string) {
    //     return await this.projectIdeasRepository.findByModality(modality)
    // }

    // public async findByCategory(id: number){
    //     return await this.projectIdeasRepository.findByCategory(id)
    // }

    public async create(projectIdea: ProjectIdea){
        return await this.projectIdeasRepository.create(projectIdea)
    }

    public async update(id: string, projectIdea: ProjectIdeaToUpdate){
        return await this.projectIdeasRepository.update(id, projectIdea)
    }

    public async delete(id: string){
        return await this.projectIdeasRepository.delete(id)
    }

}