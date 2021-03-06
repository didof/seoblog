const Category = require('../models/category')
const slugify = require('slugify')

exports.create = (req, res) => {
	const { name } = req.body
	const slug = slugify(name).toLowerCase()

	const category = new Category({ name, slug })

	category.save((err, data) => {
		if (err || !data) {
			return res.status(500).json({
				error: 'This name is not avaiable, please pick another one',
			})
		}

		return res.status(200).json({
			message: 'New category saved',
			data,
		})
	})
}

exports.getAll = (req, res) => {
	Category.find()
		.select('-__v')
		.exec((err, data) => {
			if (err || !data) {
				return res.status(500).json({
					error: defaultServerError,
				})
			}

			return res.status(200).json(data)
		})
}

exports.getOne = (req, res) => {
	const { slug } = req.params

	Category.findOne({ slug })
		.select('-__v')
		.exec((err, data) => {
			if (err || !data) {
				return res.status(500).json({
					error: defaultServerError,
				})
			}

			return res.status(200).json(data)
			//TODO: return also all related blogs
		})
}

exports.removeOne = (req, res) => {
	const { slug } = req.params

	Category.findOneAndRemove({ slug })
		.select('-__v')
		.exec((err, data) => {
			if (err || !data) {
				return res.status(500).json({
					error: defaultServerError,
				})
			}

			return res.status(200).json({
				message: 'Category deleted successfully',
			})
		})
}

const defaultServerError =
	'Something went wrong during the retrieving of resource [CATEGORY]. Please try again in 5 minutes. If problem persists please <a href="/sticazzi">contact the amministrator</a>'
