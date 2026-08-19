import express from "express"
import { askAgent, getAgentConfig } from "../Controllers/agent.controller.js"


const agentRouter = express.Router()

agentRouter.get("/config/:userId" , getAgentConfig)
agentRouter.post("/ask",askAgent)

export default agentRouter