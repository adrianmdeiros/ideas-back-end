import { UserRepository } from "../repositories/UserRepository";
import { User } from "../types/User";
import { UserContacts } from "../types/UserContacts";

export class UserService {
    constructor(
        private userRepository: UserRepository
    ) { }
    
    public async all(){
        return await this.userRepository.findAll()
    }

    public async findBy(id: number) {
        return await this.userRepository.findById(id)
    }

    public async save(user: User){
        return await this.userRepository.save(user)
    }

    public async findContacts(userId: number){
        return await this.userRepository.findContacts(userId)
    }

    public async update(contacts: UserContacts, userId: number){
        return await this.userRepository.update(contacts, userId)
    }
}