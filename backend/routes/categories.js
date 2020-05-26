const express = require('express')
const router = express.Router()

const { runValidation } = require('../validators')
const { categoryCreateValidator } = require('../validators/category')
const { isAuthenticated, adminMiddleware } = require('../controllers/auth')

const { create, getAll, getOne, removeOne } = require('../controllers/category')

router.post(
	'/create',
	categoryCreateValidator,
	runValidation,
	isAuthenticated,
	adminMiddleware,
	create
)

router.get('/', getAll)
router.get('/:slug', getOne)
router.delete('/:slug', isAuthenticated, adminMiddleware, removeOne)

module.exports = router
