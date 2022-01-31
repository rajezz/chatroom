import { decode } from "jsonwebtoken"
import APIError from "../utils/APIError.js"

export function verifyUser(req, res) {
    try {
        console.log("request body >", req.body)
		const { token } = req.body

		const { name, email } = decode(token)

		res.status(200).send({ userInfo: { name, email } })
	} catch (error) {
		throw new APIError(500, error.message ?? "Couldn't verify Google token", error)
	}
}
