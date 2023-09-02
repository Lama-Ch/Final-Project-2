// const router = require('express').Router();
// const authMiddleware = require('../middlewares/authMiddleware');
// const optionalAuthMiddleware = require('../middlewares/optionalAuthMiddleware');
// const authController = require('../controllers/authController');
// const foodController = require('../controllers/foodController');
// const ordersController = require('../controllers/ordersController');

// // Test route, for testing the API connection
// router.get('/hello', (req, res) => {
// 	return res.status(200).json({ status: 200, message: ' hello front server' });
// });

// // Auth routes
// router.post('/auth/signup', authController.signup);
// router.post('/auth/signin', authController.signin);

// // My Foods CRUD operations
// router.post('/foods', authMiddleware, foodController.postNewFood);
// router.get(
// 	'/foods/my-listings/:foodType',
// 	authMiddleware,
// 	foodController.getMyListedFoods
// );

// // Get Foods Listing and Food Detail
// router.get(
// 	'/foods/others-listing/:foodType',
// 	optionalAuthMiddleware,
// 	foodController.getFoodsList
// );
// router.get(
// 	'/foods/:id',
// 	optionalAuthMiddleware,
// 	foodController.getFoodDetailById
// );

// // Orders endpoints
// router.post('/orders', authMiddleware, ordersController.createOrder);
// router.get('/orders/:id', authMiddleware, ordersController.getOrderDetailById);

// module.exports = router;
