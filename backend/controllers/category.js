const Category = require('../models/category')
const slugify = require('slugify')

exports.create = (req, res) => {
	const { name } = req.body
	const slug = slugify(name).toLowerCase()

	const category = new Category({ name, slug })
	console.log(category)

	category.save((err, data) => {
		if (err || !data) {
			return res.status(500).json({
				error:
					'This name is not avaiable, please pick another one',
			})
		}

		return res.status(200).json({
			message: 'New category saved',
			data,
		})
	})
}
