import mongoose from "mongoose"

const { Schema, model } = mongoose

const MessageSchema = new Schema(
	{
		content: String,
		author: String,
		messageId: { type: String, unique: true, required: true }
	},
	{ timestamps: true }
)

const Message = model("message", MessageSchema)

export default Message
