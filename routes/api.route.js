import express from "express"

import { broadcastMessage } from "../controller/socket.controller.js"

const router = express.Router()

router.get("broadcast", broadcastMessage)

export default router
