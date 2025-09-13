import express from 'express'
import { login, userRegister } from '../controllers/user.controller.js'
const userRouter = express.Router()

userRouter.post('/register',userRegister)
userRouter.post('/login',login)

export default userRouter