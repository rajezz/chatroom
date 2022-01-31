import { Server } from "socket.io"
import { createServer } from "http"
import Message from "../models/Message.model.js"

class Socket {
	constructor(app) {
		this.server = createServer(app)
		this.io = new Server(this.server, { cors: { origin: "*" } })
	}
	async initializeConnection() {
		console.log("initializeConnection | called ")

		this.io.on("connection", (socket) => {
			console.log("onSocketConnection | Connection established!!")
			console.log("Socket id > ", socket.id)

			socket.on("NEW_MESSAGE_CREATE", async (args) => {
				console.log("NEW_MESSAGE_CREATE event occurred!!", args)

				try {
					const message = new Message({
						...args.message
					})

					await message.save()

					this.broadcastMessage([args.message])
				} catch (error) {
					console.error("NEW_MESSAGE_CREATE | Error catched > ", error)
				}
			})

			socket.on("FETCH_MESSAGES", async (args, callback) => {
				console.log("fetch message event called!!")

				try {
					let messages = await Message.find({})

					console.log("DB Message > ", messages)
					if (!Array.isArray(messages)) messages = []

					return callback({ messages })
				} catch (error) {
					console.error("FETCH_MESSAGES | Error catched > ", error)
				}
			})
		})
	}
	startServer(port, callback) {
		this.server.listen(port, callback)
	}
	broadcastMessage(messages) {
		this.io.emit("NEW_MESSAGE_CREATED", { messages })
	}
}

export default Socket
