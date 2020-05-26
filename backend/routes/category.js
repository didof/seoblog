const express = require('express')
const router = express.Router()

const { runValidation } = require('../validators')
const { categoryCreateValidator } = require('../validators/category')
const { isAuthenticated, adminMiddleware } = require('../controllers/auth')

const { create } = require('../controllers/category')

router.post(
	'/create',
	categoryCreateValidator,
	runValidation,
   isAuthenticated,
	adminMiddleware,
   create
)

module.exports = router
