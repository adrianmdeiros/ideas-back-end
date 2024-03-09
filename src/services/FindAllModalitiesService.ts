import { ModalityRepository } from "../repositories/ModalityRepository";

export class FindAllModalitiesService{
    constructor(
        private modalityRepository: ModalityRepository 
    ){}
    async all(){
        return await this.modalityRepository.findAll()
    }
}