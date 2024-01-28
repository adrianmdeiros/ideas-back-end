import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";

const projectRouter = Router()

const projectController = new ProjectController()

projectRouter.get('/projects', projectController.read)
projectRouter.get('/projects/:id', projectController.read)
projectRouter.post('/projects', projectController.create)
projectRouter.put('/projects/:id', projectController.update)
projectRouter.put('/projects/:id/:increment', projectController.update)
projectRouter.delete('/projects/:id', projectController.delete)

export default projectRouter
