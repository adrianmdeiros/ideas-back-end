import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";

const projectRouter = Router()


const projectController = new ProjectController()


projectRouter.post('/projects', projectController.create)
projectRouter.get('/projects', projectController.read)
projectRouter.put('/projects/:id', projectController.update)
projectRouter.delete('/projects/:id', projectController.delete)

export default projectRouter
