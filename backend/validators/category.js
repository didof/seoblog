const { check } = require('express-validator')

const name = check('name').not().isEmpty().withMessage('Name is required')

exports.categoryCreateValidator = [name]
