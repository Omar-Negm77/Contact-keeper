const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST api/users
// @desc. Register a user
// @access  Public

router.post(
	'/',
	body('name', 'Please add a name').not().isEmpty(),
	body('email', 'please include a valid email').isEmail(),
	body(
		'password',
		'please enter a password not less than 6 characters'
	).isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try {
			//Check user existence
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}
			// use User model to create a new user

			user = new User({
				name,
				email,
				password,
			});
			// encrypt the password
			const salt = await bcrypt.genSalt(10);
			// Hash password using salt
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			// Json Web Token
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000, // default 3600  (an hour).
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
