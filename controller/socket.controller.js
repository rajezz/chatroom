let socketInstance

export function broadcastMessage(req, res) {
	const { message } = req.body

    socketInstance.broadcastMessage(message)

	res.status(201).send("Message sent successfully!!")
}

export function socketInitializer(socket) {
    socketInstance = socket
}
