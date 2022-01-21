import { Server } from "socket.io"
import { createServer } from "http"

const onSocketConnection = (socket) => {
	console.log("onSocketConnection | Connection established!!")
	console.log("Socket object > ", socket)
}

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
            
			socket.on("NEW_MESSAGE_CREATE", (args) => {
				console.log("NEW_MESSAGE_CREATE event occurred!!", args)

				this.broadcastMessage([args.message])
			})

            socket.on("FETCH_MESSAGES", (args, callback) => {

                console.log("fetch message event called!!")
                
				return callback({
					messages: [
						{
							author: "Rajeswaran",
							content: "Hi team!!"
						},
						{
							author: "Rajeswaran",
							content: "How things are going?"
						},
						{
							author: "Peter",
							content: "Going good Rajesh"
						},
						{
							author: "Rajeswaran",
							content: "👍🏻 Cool"
						}
					]
				})
			})

		})
        
		// const sockets = await this.io.fetchSockets()
		// console.log("All sockets > ", sockets)
	}
	startServer(port, callback) {
		this.server.listen(port, callback)
	}
	broadcastMessage(messages) {
		this.io.emit("NEW_MESSAGE_CREATED", { messages })
	}
}

export default Socket
