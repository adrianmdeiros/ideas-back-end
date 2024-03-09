import { DepartmentRepository } from "../repositories/DepartmentRepository";

export class FindAllDepartmentsService{
    constructor(
        private deparmentRepository: DepartmentRepository 
    ){}
    async all(){
        return await this.deparmentRepository.findAll()
    }
}