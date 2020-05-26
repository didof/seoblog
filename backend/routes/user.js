const express = require('express')
const router = express.Router()

const { isAuthenticated, authMiddleware, adminMiddleware } = require('../controllers/auth')

router.get('/user', isAuthenticated, authMiddleware, (req, res) => {
   res.json(req.profile)
})

router.get('/admin', isAuthenticated, adminMiddleware, (req, res) => {
   res.send(req.profile)
})

module.exports = router