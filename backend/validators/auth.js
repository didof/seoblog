const { check } = require('express-validator')

const name = check('name').not().isEmpty().withMessage('Name is required')

const email = check('email')
	.not()
	.isEmpty()
	.withMessage('Email is required')
	.isEmail()
	.withMessage('Must be valid email address')

const password = check('password')
	.not()
	.isEmpty()
	.withMessage('Password is required')
	.isLength({ min: 6 })
	.withMessage('Password must be at least 6 charactes long')

exports.userSignupValidator = [name, email, password]

exports.userSigninValidator = [email, password]
