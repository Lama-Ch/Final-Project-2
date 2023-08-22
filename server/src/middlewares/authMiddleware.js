const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res
			.status(401)
			.json({ error: 'Please login to perfrom this action.' });
	}

	const token = authHeader.replace('Bearer ', '');

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		// Attach the user data to the request for further use
		req.authUserId = decoded.userId;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Please login to perfrom this action.' });
	}
};

module.exports = authMiddleware;
