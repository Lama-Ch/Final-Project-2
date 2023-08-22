const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		total: { type: Number, required: true },
		fullname: { type: String, required: true },
		email: { type: String, required: true },
		address1: { type: String, required: true },
		address2: { type: String },
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
