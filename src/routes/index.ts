import { Router } from "express";
import userRouter from "./user.routes";
import projectRouter from "./project.routes";
import categoryRouter from "./category.routes";

const routes = Router()

routes.use(userRouter)
routes.use(projectRouter)
routes.use(categoryRouter)

export default routes