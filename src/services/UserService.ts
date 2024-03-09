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

    public async findContacts(userid: number){
        return await this.userRepository.findContacts(userid)
    }

    public async update(contacts: UserContacts, userid: number){
        return await this.userRepository.update(contacts, userid)
    }
}