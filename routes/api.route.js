import express from "express"

import { broadcastMessage } from "../controller/socket.controller.js"
import { verifyUser } from "../controller/auth.controller.js"

const router = express.Router()

router.post("/broadcast", broadcastMessage)
router.post("/user/signin", verifyUser)

export default router
