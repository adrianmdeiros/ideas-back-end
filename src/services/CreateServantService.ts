import { ServantRepository } from "../repositories/ServantRepository";
import { Servant } from "../types/Servant";

export class CreateServantService {
    constructor(
        private servantRepository: ServantRepository
    ) { }
    async save(servant: Servant) {
        return await this.servantRepository.save(servant);
    }
}