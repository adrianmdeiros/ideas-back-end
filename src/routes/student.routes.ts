import { Router } from "express";
import { StudentController } from "../controllers/StudentController";


const studentRouter = Router()
const studentController = new StudentController()

studentRouter.post('/students', studentController.create)

export default studentRouter