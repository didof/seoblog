const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// App
const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// Database

mongoose
	.connect(
		process.env.NODE_ENV === 'development'
			? process.env.MONGO_ATLAS_URI
			: process.env.MONGO_LOCAL_URI,
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		}
	)
	.then(() =>
		console.log(
			`> Connection to ${
				process.env.NODE_ENV === 'development'
					? 'CLOUD'
					: 'LOCAL'
			} established `
		)
	)
	.catch((err) => console.error('> [ERROR] [mongoose.connect]', err))

// Cors
if (process.env.NODE_ENV === 'development') {
	app.use(cors({ origin: process.env.CLIENT_URL }))
}

// Routes
app.use('/api/blog', require('./routes/blog'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/user'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/tags', require('./routes/tags'))

// Port
const port = process.env.PORT || 8000
app.listen(port, () => {
	console.log(`> Server running on ${process.env.SERVER_URL}:${port}`)
})
