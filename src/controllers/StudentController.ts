import { Request, Response } from "express";
import { StudentService } from "../services/CreateStudentService";
import { StatusCodes } from "http-status-codes";
import { StudentRepository } from "../repositories/StudentRepository";

export class StudentController {
    async create(req: Request, res: Response) {
        const { id, name, email, phone, course } = req.body
        const student = {
            id,
            name,
            email,
            phone,
            course
        }

        const studentService = new StudentService(new StudentRepository())
        const createdStudent = await studentService.save(student)

        return res.status(StatusCodes.CREATED).json(createdStudent)
    }
}