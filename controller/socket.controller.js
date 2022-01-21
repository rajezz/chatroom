let socketInstance

export function broadcastMessage(req, res) {
	const { messages } = req.body

    console.log("Messages > ", req.body)
    socketInstance.broadcastMessage(messages)

	res.status(201).send("Message sent successfully!!")
}

export function socketInitializer(socket) {
    socketInstance = socket
}
