const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
	const { name, email, password } = req.body

	User.findOne({ email }).exec((err, user) => {
		if (err) {
			return res.status(500).json({
				error: defaultServerError,
			})
		}

		if (user) {
			return res.status(409).json({
				error: 'Email is alredy taken. Plese, pick another one',
			})
		}
		let username = shortId.generate()
		let profile = `${process.env.CLIENT_URL}/profile/${username}`

		let newUser = new User({ username, name, email, password, profile })
		newUser.save((err, userSaved) => {
			if (err) {
				return res.status(500).json({
					error: defaultServerError,
				})
			}

			return res.status(201).json({
				message: 'Sign up success, please sign in',
			})
		})
	})
}

exports.signin = (req, res) => {
	const { email, password } = req.body

	// check if user exists
	User.findOne({ email }).exec((err, user) => {
		if (err) {
			return res.status(500).json({
				error: defaultServerError,
			})
		}
		if (!user) {
			return res.status(404).json({
				error: 'This username is not registered',
			})
		}

		// authenticate
		if (!user.authenticate(password)) {
			return res.status(409).json({
				error: 'Credentials are invalid',
			})
		}

		// generate and sent jwt to client
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		})

		res.cookie('token', token, { expiresIn: '1d' })

		const { _id, username, name, email, role } = user

		return res.json({
			token,
			user: { _id, username, name, email, role },
			message: 'Sign in successfull',
		})
	})
}

exports.signout = (req, res) => {
	res.clearCookie('token')
	return res.status(200).json({
		message: 'Sign out success',
	})
}

exports.isAuthenticated = expressJwt({
	secret: process.env.JWT_SECRET,
})

exports.authMiddleware = (req, res, next) => {
	const { _id } = req.user

	User.findById({ _id })
		.select('-hashed_password -__v -salt')
		.exec((err, user) => {
			if (err) {
				return res.status(500).json({
					error: defaultServerError,
				})
			}

			if (!user) {
				return res.status(404).json({
					error: 'User not found',
				})
			}

			req.profile = user
			next()
		})
}

exports.adminMiddleware = (req, res, next) => {
	const { _id } = req.user

	User.findById({ _id })
		.select('-hashed_password -__v -salt')
		.exec((err, user) => {
			if (err) {
				return res.status(500).json({
					error: defaultServerError,
				})
			}

			if (!user) {
				return res.status(404).json({
					error: 'User not found',
				})
			}

			if (user.role !== 1) {
				return res.status(401).json({
					error: 'Resource private. Access denied',
				})
			}

			req.profile = user
			next()
		})
}

const defaultServerError =
	'Something went wrong during the authorization process. Please try again in 5 minutes. If problem persists please <a href="/sticazzi">contact the amministrator</a>'
