const asyncRouteHandler = (method) => (req, res, next) => {
	return Promise.resolve(method(req, res, next)).catch((error) => next(error))
}

export default asyncRouteHandler