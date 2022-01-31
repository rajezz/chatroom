class APIError extends Error {
    constructor(statusCode, message, stack) {
        super(message)
        this.status = statusCode
        stack ? this.stack = stack: Error.captureStackTrace(this, this.constructor)
    }
}

export default APIError