import { Router }     from "express";
import userRouter     from "./user.routes";
import projectRouter  from "./project.routes";
import categoryRouter from "./category.routes";
import swaggerUi      from "swagger-ui-express";
import swaggerDocument from '../swagger.json'

const routes = Router()

routes.use(userRouter)
routes.use(projectRouter)
routes.use(categoryRouter)

routes.use('/api-docs', swaggerUi.serve)
routes.get('/api-docs', swaggerUi.setup(swaggerDocument))



export default routes