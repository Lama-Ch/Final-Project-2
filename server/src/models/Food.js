const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },// Food name (required)
		description: { type: String, required: true },// Food description (required)
		price: { type: Number, required: true },// Food price (required)
		foodType: { type: String, enum: ['drink', 'meal'], required: true },// Food type ('drink' or 'meal', required)
		isVegetarian: { type: Boolean, required: true },// Whether the food is vegetarian (required)
		isAvailable: { type: Boolean, default: true },// Whether the food is available (default: true)
		// Assuming you have a User model
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		image: { type: String },// will add images later
	},
	{ timestamps: true }//createdAt and updatedAt timestamps 
);
//'Food' model
const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
