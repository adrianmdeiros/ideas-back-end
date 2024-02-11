import { Router } from 'express'
import { CategoryController } from '../controllers/CategoryController'

const categoryRouter = Router()

const categoryController = new CategoryController()

categoryRouter.get('/categories', categoryController.read)

export default categoryRouter