import { database } from "../database";
import { Student } from "../types/Student";

export class StudentRepository {
    async save (student: Student) {
        const savedStudent = await database.student.create({
            data: {
                user: {
                    create: {
                        id: student.id,
                        name: student.name,
                        email: student.email,
                        phone: student.phone, 
                        bond: "Student"
                    }
                },
                course: {
                    connectOrCreate: {
                        where: {
                            name: student.course
                        },
                        create: {
                            name: student.course
                        }
                    }
                } 
            }, 
            select: {
                user: true,
                course: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return savedStudent
    }
}