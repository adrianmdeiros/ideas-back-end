import { Router } from "express";
import userRouter from "./user.routes";
import projectRouter from "./project.routes";

const routes = Router()

routes.use(userRouter)
routes.use(projectRouter)

export default routes