import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRouter = Router()

const userController = new UserController()

userRouter.get('/users', userController.read)
userRouter.get('/users/:id', userController.read)
userRouter.get('/users/:id/contacts', userController.readContacts)
userRouter.post('/users', userController.create)
userRouter.put('/users/:id', userController.update)

export default userRouter