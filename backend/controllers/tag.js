const Tag = require('../models/tag')
const slugify = require('slugify')

exports.create = (req, res) => {
	const { name } = req.body
	const slug = slugify(name).toLowerCase()

	const tag = new Tag({ name, slug })

	tag.save((err, data) => {
		if (err || !data) {
			return res.status(500).json({
				error: 'This name is not avaiable, please pick another one',
			})
		}

		return res.status(200).json({
			message: 'New tag saved',
			data,
		})
	})
}

exports.getAll = (req, res) => {
	Tag.find()
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

	Tag.findOne({ slug })
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

	Tag.findOneAndRemove({ slug })
		.select('-__v')
		.exec((err, data) => {
			if (err || !data) {
				return res.status(500).json({
					error: defaultServerError,
				})
			}

			return res.status(200).json({
				message: 'Tag deleted successfully',
			})
		})
}

const defaultServerError =
	'Something went wrong during the retrieving of resource [TAG]. Please try again in 5 minutes. If problem persists please <a href="/sticazzi">contact the amministrator</a>'
