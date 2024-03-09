import { database } from "../database";

export class DepartmentRepository{
    async findAll(){
        const allDepartments = await database.department.findMany()
        return allDepartments
    }
}