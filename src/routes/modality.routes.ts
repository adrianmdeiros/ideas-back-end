import { Router } from 'express'
import { ModalityController } from '../controllers/ModalityController'

const modalityRouter = Router()

const modalityController = new ModalityController()

modalityRouter.get('/modalities', modalityController.read)

export default modalityRouter