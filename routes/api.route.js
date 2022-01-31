import express from "express"

import { broadcastMessage } from "../controller/socket.controller.js"
import { verifyUser } from "../controller/auth.controller.js"

import asyncRouteHandler from "../utils/asyncRouteHandler.js"
const router = express.Router()

router.post("/broadcast", asyncRouteHandler(broadcastMessage))
router.post("/user/signin", asyncRouteHandler(verifyUser))

export default router
