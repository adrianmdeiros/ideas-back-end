import { Router } from "express";
import userRouter from "./user.routes";
import projectIdeasRouter from "./projectIdea.routes";
import categoryRouter from "./category.routes";
import studentRouter from "./student.routes";
import servantRouter from "./servant.routes";
import departmentRouter from "./department.routes";
import modalityRouter from "./modality.routes";


const routes = Router()

routes.use(userRouter)
routes.use(projectIdeasRouter)
routes.use(categoryRouter)
routes.use(studentRouter)
routes.use(servantRouter)
routes.use(departmentRouter)
routes.use(modalityRouter)


export default routes