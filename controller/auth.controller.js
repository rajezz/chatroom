import { decode } from "jsonwebtoken"

export function verifyUser(req, res) {
    try {
        console.log("request body >", req.body)
		const { token } = req.body

		const { name, email } = decode(token)

		res.status(200).send({ userInfo: { name, email } })
	} catch (error) {
		res.status(500).send({ message: error.message | "Couldn't verify Google token" })
	}
}
