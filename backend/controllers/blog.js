const fs = require('fs')
const formidable = require('formidable')
const slugify = require('slugify')
const stripHtml = require('string-strip-html')
const _ = require('lodash')

const smartTrim = require('../helpers/smartTrim')

const Blog = require('../models/blog')
const Category = require('../models/category')
const Tag = require('../models/tag')

exports.create = (req, res) => {
	let form = new formidable.IncomingForm()
	form.keepExtensions = true
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(500).json({
				error:
					'Something went wrong during the catching of form data. Please try again',
				err,
			})
		}

		const { title, body, categories, tags } = fields

		if (!title || title.length === 0) {
			return res.status(400).json({
				error: 'Title is required',
			})
		}

		if (!body || body.length < 200) {
			return res.status(400).json({
				error: 'Content is too short',
			})
		}

		if (!categories || categories.length === 0) {
			return res.status(400).json({
				error: 'At least one category is required',
			})
		}

		if (!tags || tags.length === 0) {
			return res.status(400).json({
				error: 'At least one tag is required',
			})
		}

		let blog = new Blog({
			title,
			slug: slugify(title).toLowerCase(),
			body,
			excerpt: smartTrim(body, 320, '', '...'),
			mtitle: `${title} | ${process.env.APP_NAME}`,
			mdesc: stripHtml(body.substring(0, 160)),
			categories: categories.split(':'),
			tags: tags.split(':'),
			author: req.user._id,
		})

		const { photo } = files
		if (photo) {
			if (photo.size > 10000000) {
				return res.status(413).json({
					error: 'The photo is too heavy. Please select one lighter thant 1Mb.',
				})
			}
			blog.photo.data = fs.readFileSync(photo.path)
			blog.photo.contentType = photo.type
		}

		blog.save((err, data) => {
			if (err) {
				console.log(err)
				return res.status(500).json({
					error:
						'Something went wrong during the catching of form data. Please try again',
					err,
				})
			}

			return res.status(201).json({
				message: 'New Blog successfully uploaded',
				data,
			})
		})
	})
}

exports.getAll = (req, res) => {
	Blog.find().exec((err, data) => {
		if (err || !data) {
			return res.status(500).json({
				error: 'Error during retrieving of all post',
			})
		}

		return res.status(200).json(data)
	})
}
