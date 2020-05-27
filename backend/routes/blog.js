const express = require('express')
const router = express.Router()

const { create, getAll } = require('../controllers/blog')

const { isAuthenticated, adminMiddleware } = require('../controllers/auth')



router.get('/', getAll)
// router.get('/:slug', getAll)
// router.delete('/:slug', getAll)

router.post('/create', isAuthenticated, adminMiddleware, create)

module.exports = router
