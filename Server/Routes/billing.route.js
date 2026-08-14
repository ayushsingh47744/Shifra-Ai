import express from "express"
import { isAuth } from "../Middleware/isAuth.js"
import { createOrder, verifyBilling } from "../Controllers/billing.controller.js"


const billingRouter = express.Router()


billingRouter.post("/order" , isAuth , createOrder)
billingRouter.post("/verify", isAuth , verifyBilling)

export default billingRouter