import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRouter = Router()

const userController = new UserController()

userRouter.get('/users', userController.read)
userRouter.get('/users/contacts', userController.readContacts)
userRouter.post('/users', userController.create)
userRouter.put('/users/contacts', userController.updateContacts)

export default userRouter