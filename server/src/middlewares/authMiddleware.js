//'jsonwebtoken' library
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	  // Get the Authorization header from the request
	const authHeader = req.headers.authorization;
// Check if the Authorization header is missing or doesn't start with 'Bearer '
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res
			.status(401)
			.json({ error: 'Please login to perfrom this action.' });
	}
// Extract the token from the Authorization header by removing 'Bearer '
	const token = authHeader.replace('Bearer ', '');

	try {
		// JWT secret key
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		// Attach the user ID to the request for later use
		req.authUserId = decoded.userId;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Please login to perfrom this action.' });
	}
};

module.exports = authMiddleware;
