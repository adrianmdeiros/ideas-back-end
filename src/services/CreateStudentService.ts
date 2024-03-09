import { StudentRepository } from "../repositories/StudentRepository";
import { Student } from "../types/Student";

export class StudentService {
    constructor(
        private studentRepository: StudentRepository
    ) { }
    
    async save(student: Student){
        return this.studentRepository.save(student)
    }

}