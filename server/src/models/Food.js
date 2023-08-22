const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		foodType: { type: String, enum: ['drink', 'meal'], required: true },
		isVegetarian: { type: Boolean, required: true },
		isAvailable: { type: Boolean, default: true },
		// Assuming you have a User model
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		image: { type: String },
	},
	{ timestamps: true }
);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
