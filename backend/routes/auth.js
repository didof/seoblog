const express = require('express')
const router = express.Router()

// controller
const { signup, signin, signout, isAuthenticated } = require('../controllers/auth')

// validators
const { runValidation } = require('../validators')
const {
	userSignupValidator,
	userSigninValidator,
} = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, signup)

router.post('/signin', userSigninValidator, runValidation, signin)

router.get('/signout', signout)

router.post('/secret', isAuthenticated, (req, res) => {
	res.json({
		message: 'secret page',
	})
})

module.exports = router
