import { Router } from "express";
import { CourseController } from "../controllers/CourseController";


const courseRouter = Router()

const coursesController = new CourseController()

courseRouter.get('/courses', coursesController.read)

export default courseRouter

