import { Router } from "express";
import { ProjectIdeasController } from "../controllers/ProjectIdeasController";

const projectIdeasRouter = Router()

const projectIdeasController = new ProjectIdeasController()

projectIdeasRouter.get('/project-ideas', projectIdeasController.read)
projectIdeasRouter.post('/project-ideas', projectIdeasController.create)
projectIdeasRouter.put('/project-ideas/:id', projectIdeasController.update)
projectIdeasRouter.delete('/project-ideas/:id', projectIdeasController.delete)

export default projectIdeasRouter
