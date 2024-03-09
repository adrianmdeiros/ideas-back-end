import { Router } from 'express'
import { DepartmentController } from '../controllers/DepartmentController'

const departmentRouter = Router()

const departmentController = new DepartmentController()

departmentRouter.get('/departments', departmentController.read)

export default departmentRouter