import express from "express"
import dotenv from "dotenv"
import connectDB from "./Configs/ConnectDB.js"
import authRouter from "./Routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./Routes/user.route.js"
import agentRouter from "./Routes/agent.route.js"
import billingRouter from "./Routes/billing.route.js"
import { conversationRouter, publicConversationRouter } from "./Routes/conversation.route.js"
import dns from 'dns';
// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const app = express()
const privateCors =
  cors({

    origin: [
      "https://shifra-ai-1-xral.onrender.com"
    ],

    credentials: true

  });

  const publicCors =
  cors({
    origin: "*",
  });

app.use(express.json())
app.use(cookieParser())



app.get("/" , (req,res)=>{
    res.json("Hello from Server")
})

app.use("/api/auth",privateCors , authRouter)
app.use("/api/user",privateCors , userRouter)
app.use("/api/billing",privateCors , billingRouter)
app.use("/api/conversation", privateCors, conversationRouter)
app.use("/api/conversation-end", publicCors, publicConversationRouter)
app.use("/api/agent",publicCors , agentRouter)
const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log(`Server Started on Port ${PORT}`)
    connectDB()
})
