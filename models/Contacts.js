const mongoose = require('mongoose');
const ContactSchema = mongoose.Schema({
	//create a relationship between contact and user
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', // refers to users collection
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	type: {
		type: String,
		default: 'Personal',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('contact', ContactSchema);
