import express from "express"
import { getConversations, getConversationById, endConversation } from "../Controllers/conversation.controller.js"
import { isAuth } from "../Middleware/isAuth.js"

const conversationRouter = express.Router()
const publicConversationRouter = express.Router()

conversationRouter.get("/", isAuth, getConversations)
conversationRouter.get("/:id", isAuth, getConversationById)

publicConversationRouter.post("/", endConversation)

export { conversationRouter, publicConversationRouter }