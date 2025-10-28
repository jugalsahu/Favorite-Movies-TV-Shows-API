import { Router } from "express";
import { getSession, getUsers, login, signup, } from "../controller/user.controller";

const UserRouter = Router()

UserRouter.post('/signup', signup)
UserRouter.post('/login', login)
UserRouter.post('/session', getSession)
UserRouter.get('/', getUsers)

export default UserRouter