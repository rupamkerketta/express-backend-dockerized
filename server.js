const express = require('express')
const app = express()

const { promisify } = require('util')

// PORT
const PORT = process.env.PORT || 5000

// Database connection - mongoDB
const db = require('./db')

// Response Time pkg
const responseTime = require('response-time')

// Middlewares
app.use(responseTime())
app.use(express.json())

app.get('/', (req, res) => {
	try {
		res.send('<h1>Hello there, from Express Dockerized</h1>')
	} catch (err) {
		console.log(err)
		res.status(500).send('<h1>Err: Internal Server Error!!</h1>')
	}
})

db.connect(() => {
	app.listen(PORT, () =>
		console.log(`[express] Server running on PORT ${PORT}`)
	)
})
