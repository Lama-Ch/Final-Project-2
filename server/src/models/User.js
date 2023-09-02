const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, unique: true },// User's username (unique)
	fullname: String,// User's full name
	email: { type: String, unique: true },// User's email (unique)
	password: String,// User's password
});

const User = mongoose.model('User', userSchema);

module.exports = User;
