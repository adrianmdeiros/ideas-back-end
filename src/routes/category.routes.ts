import { Router } from 'express'
import { CategoryController } from '../controllers/CategoryController'

const categoryRouter = Router()

const categoryController = new CategoryController()

categoryRouter.post('/categories', categoryController.create)
categoryRouter.get('/categories', categoryController.read)
categoryRouter.put('/categories/:id', categoryController.update)

export default categoryRouter