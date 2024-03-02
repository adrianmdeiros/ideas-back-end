import { CategoryRepository } from "../repositories/CategoryRepository";

export class FindAllCategoriesService{
    constructor(
        private courseRepository: CategoryRepository
    ) { }

    public async all(){
        return await this.courseRepository.findAll()
    }
}