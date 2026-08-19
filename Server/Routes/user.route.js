import express from "express"
import { isAuth } from "../Middleware/isAuth.js"
import { getCurrentUser, saveAgent } from "../Controllers/user.controller.js"

const userRouter = express.Router()


userRouter.get("/current-user" , isAuth , getCurrentUser)
userRouter.post("/save-agent" , isAuth , saveAgent)

export default userRouter