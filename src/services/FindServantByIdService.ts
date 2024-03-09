import { ServantRepository } from "../repositories/ServantRepository";

export class FindServantByIdService {
    constructor(
        private servantRepository: ServantRepository
    ) { }
    
    async findById(id: number) {
        return await this.servantRepository.findById(id);
    }
}