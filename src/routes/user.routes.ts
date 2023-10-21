import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRouter = Router()

const userController = new UserController()

userRouter.post('/users', userController.create)
userRouter.get('/users', userController.read)
userRouter.put('/users/:id', userController.update)
userRouter.get('/users/:id/contacts', userController.readContacts)

export default userRouter