import express from "express"
import chalk from "chalk"
import session from "express-session"
import bodyParser from "body-parser"
import logger from "morgan"
import errorHandler from "errorhandler"
import dotenv from "dotenv"
import mongoose from "mongoose"
import passport from "passport"
import cors from "cors"

import apiRoutes from "./routes/api.route.js"
import { socketInitializer } from "./controller/socket.controller.js"
import Socket from "./services/socket.service.js"
import APIError from "./utils/APIError.js"

dotenv.config({ path: ".env.development" })

const { red, green } = chalk

/**
 * Create Express server.
 */
const app = express()

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("error", (error) => {
	console.error(
		`${red("✗")} MongoDB connection error. Please make sure MongoDB is running > `,
		error
	)
	process.exit()
})

const port = process.env.PORT || 1122

app.use(cors())
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET,
		cookie: { maxAge: 1209600000 } // two weeks in milliseconds
	})
)

app.use(passport.initialize())
app.use(passport.session())

/**
 * Error Handler.
 */
if (app.get("env") == "development") {
	// only use in development
	console.log("Development version running!! errorHandler need to be added.")
	app.use(errorHandler())
} else {
	console.log("Production version running!!")
	app.use((err, req, res, next) => {
		console.error(err)
		res.status(500).send("Server Error")
	})
}

const socket = new Socket(app)

socket.initializeConnection()

socket.startServer(port, onConnectionCallback)

socketInitializer(socket)

app.use("/api", apiRoutes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new APIError(404, "Resource Not found"))
});

function onConnectionCallback() {
	console.log(
		`${green("✓")} App is running at http://localhost:${port} in ${app.get("env")} mode`
	)
	console.log("Press CTRL-C to stop\n")
}

export default app
