import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    constructor(
        private userRepository: UserRepository
    ) { }
    
    public async findById(id: number) {
        return this.userRepository.findById(id)
    }
}