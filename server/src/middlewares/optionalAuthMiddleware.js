const jwt = require('jsonwebtoken');

// Check if the user have Auth Token and valid then embed the userId in request
 // Get the Authorization header from the request
const optionalAuthMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return next();
	}

	const token = authHeader.replace('Bearer ', '');

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		  // Attach the decoded user ID 
		req.authUserId = decoded.userId;
		next();
	} catch (error) {
		return next();
	}
};

module.exports = optionalAuthMiddleware;
