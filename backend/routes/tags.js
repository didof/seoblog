const express = require('express')
const router = express.Router()

const { runValidation } = require('../validators')
const { tagCreateValidator } = require('../validators/tag')
const { isAuthenticated, adminMiddleware } = require('../controllers/auth')

const { create, getAll, getOne, removeOne } = require('../controllers/tag')

router.post(
	'/create',
	tagCreateValidator,
	runValidation,
	isAuthenticated,
	adminMiddleware,
	create
)

router.get('/', getAll)
router.get('/:slug', getOne)
router.delete('/:slug', isAuthenticated, adminMiddleware, removeOne)

module.exports = router
