const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Food = require('./models/Food');
const Order = require('./models/Order');
const emailHelper = require('./utils/emailHelper');

// Sign up controller
exports.signup = (req, res) => {
	const { username, fullname, email, password } = req.body;

	// Generate the hash for password and save it instead of the raw passsword
	bcrypt.hash(password, 10, (err, hashedPassword) => {
		// If hashing fails, terminate and return error
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		const newUser = new User({
			username,
			fullname,
			email,
			password: hashedPassword,
		});

		newUser
			.save()
			.then((result) => {
				res.status(201).json({ message: 'User registered successfully.' });
			})
			.catch((err) => {
				return res.status(500).json({
					error: 'There was an error with your request, please retry',
					detail: err.message,
				});
			});
	});
};

// Sign in controller
exports.signin = (req, res) => {
	const { username, password } = req.body;

	User.findOne({ username })
		.then((user) => {
			if (!user) {
				// For security reason, don't expose that the user isn't found
				return res
					.status(401).json({ error: 'The provided username or password is incorrect!' });
			}
			bcrypt.compare(password, user.password, (err, isPasswordValid) => {
				if (err) {
					return res.status(500).json({ error: err.message });
				}
//If the passwords match, generates a JSON Web Token (JWT) and sends it along with user information in the response
				if (!isPasswordValid) {
					return res.status(401).json({
						error: 'The provided username or password is incorrect!',
					});
				}

				const token = jwt.sign(
					{ userId: user._id },
					process.env.JWT_SECRET_KEY
				);
				// Remove the password from user data
				const userData = {
					id: user._id,
					fullname: user.fullname,
					username: user.username,
					email: user.email,
				};
				res.json({ token, user: userData });
			});
		})
		.catch((err) => {
			return res.status(500).json({ error: err.message });
		});
};

//based on the authenticated user ID
exports.getCurrentUser = (req, res) => {
	const authUserId = req.authUserId;
	User.findById(authUserId)
	.then((user) => {
		if (!user) {
			// For security reason, only user isn't found
			return res
				.status(401)
				.json({ error: 'This user does not exists in the system' });
		}
		// Remove the password from user data
		const userData = {
			id: user._id,
			fullname: user.fullname,
			username: user.username,
			email: user.email,
		};
		res.json({ user: userData });
	})
	.catch((err) => {
		return res.status(500).json({ error: err.message });
	});
};

//creation of a new food item
exports.postNewFood = (req, res) => {
	const { name, description, foodType, isVegetarian, price } = req.body;
	const authUserId = req.authUserId;
	console.log('Image File', req.file)
	const uploadedImagePath = req.file.path;


	Food.create({
		name,
		description,
		foodType,
		isVegetarian,
		price,
		postedBy: authUserId,
		image: uploadedImagePath || ''
	})
		.then((result) => {
			return res
				.status(201)
				.json({ message: 'Your food has been posted successfully' });
		})
		.catch((err) => {
			return res.status(500).json({
				error: 'Failed to post your food. Please retry',
				errorDetail: err.message,
			});
		});
};


//a list of food items posted by the authenticated user
exports.getMyListedFoods = (req, res) => {
	const foodType = req.params.foodType;
	const authUserId = req.authUserId;

	Food.find({
		foodType: foodType,
		postedBy: authUserId,
	})
		.then((result) => {
			return res.status(201).json({ result });
		})
		.catch((err) => {
			return res.status(500).json({
				error: 'Failed to fetch your listing. Please retry',
				errorDetail: err.message,
			});
		});
};
//a list of food items of a given foodType, excluding those posted by the authenticated user.
exports.getFoodsList = (req, res) => {
	const foodType = req.params.foodType;
	const authUserId = req.authUserId;

	Food.find({
		foodType: foodType,
		postedBy: { $ne: authUserId },
	})
	
		.populate({ path: 'postedBy', select: ['username', 'fullname', 'email'] })
		.then((result) => {
			return res.status(201).json({ result });
		})
		.catch((err) => {
			return res.status(500).json({
				error: 'Failed to fetch listing. Please retry',
				errorDetail: err.message,
			});
		});
};
//Retrieves detailed information about a food item based on its id
exports.getFoodDetailById = (req, res) => {
	const foodId = req.params.id;
	const authUserId = req.authUserId;

	Food.findById(foodId)
	
		.populate({ path: 'postedBy', select: ['username', 'fullname', 'email'] })
		.then((result) => {
			if (!result) {
				return res
					.status(404)
					.json({ message: 'Could not found any food with provided ID' });
			}

			// Check if it is user self posted
			let isSelfPost = false;
			if (
				authUserId &&
				result.postedBy &&
				result.postedBy._id.toString() === authUserId
			) {
				isSelfPost = true;
			}

			const modifiedFood = { ...result._doc, isSelfPost };

			return res.status(201).json({ result: modifiedFood });
		})
		.catch((err) => {
			return res.status(500).json({
				error: 'Failed to fetch the food. Please retry',
				errorDetail: err.message,
			});
		});
};


//creation of a new order
//Sends an order confirmation email
exports.createOrder = (req, res) => {
	const { fullname, email, food, total, address1, address2 } = req.body;
	const authUserId = req.authUserId;
	Order.create({
		total,
		fullname,
		email,
		address1,
		address2,
		food,
		orderedBy: authUserId,
	})
		.then((result) => {
			// Get ordrId to send back in result
			const orderId = result._id;

			// Update the Food document to make food Unavilable
			Food.updateOne({ _id: food }, { isAvailable: false })
				.then((updatedResult) => {
					// Send Email Confirmation
					emailHelper.sendOrderConfirmationEmail({
						fullname,
						email,
						total,
						orderDateTime: result.createdAt,
					});

					return res.status(201).json({
						message: 'Your order has been placed successfully',
						orderId: orderId,
					});
				})
				.catch((foodUpdateErr) => {
					// If food update fails, then remove the order document and return error
					// "Fire and Forget" operation
					Order.deleteOne({ _id: orderId }).then().catch();

					return res.status(500).json({
						error: 'Failed to place your order, please retry.',
						errorDetail: foodUpdateErr.message,
					});
				});
		})
		.catch((err) => {
			return res.status(500).json({
				error: 'Failed to place your order, please retry.',
				errorDetail: err.message,
			});
		});
};

//Retrieves detailed information about an order based on its id
exports.getOrderDetailById = (req, res) => {
	const orderId = req.params.id;

	Order.findById(orderId)
		.populate({
			path: 'food',
			select: ['name', 'description', 'foodType', 'isVegetarian'],
		})
		.then((result) => {
			if (!result) {
				return res
					.status(404)
					.json({ message: 'Could not found any order with provided ID' });
			}

			return res.status(201).json({ result });
		})
		.catch((err) => {
			return res.status(500).json({
				error: 'Failed to fetch the order, please retry',
				errorDetail: err.message,
			});
		});
};

