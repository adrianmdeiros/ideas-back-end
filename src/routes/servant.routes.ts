import { Router } from "express";
import { ServantController } from "../controllers/ServantController";

const servantRouter = Router()

const servantController = new ServantController()

servantRouter.post('/servants', servantController.create)

export default servantRouter