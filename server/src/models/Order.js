const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		total: { type: Number, required: true },// Total order amount (required)
		fullname: { type: String, required: true },// Customer's full name (required)
		email: { type: String, required: true },// Customer's email (required)
		address1: { type: String, required: true },// Customer's address line 1 (required)
		address2: { type: String },// Customer's address line 2 (optional)
		orderedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		food: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Food',
			required: true,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
