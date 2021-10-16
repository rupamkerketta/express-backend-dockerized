const express = require('express')
const app = express()
const EventEmitter = require('events')

// PORT
const PORT = process.env.PORT || 5000

// Database connection - mongoDB
const db = require('./db')

// Response Time pkg
const responseTime = require('response-time')

// Middlewares
app.use(responseTime(), express.json())

app.get('/', (req, res) => {
	try {
		res.send('<h1>Hello there, from Express Dockerized</h1>')
	} catch (err) {
		console.log(err)
		res.status(500).send('<h1>Err: Internal Server Error!!</h1>')
	}
})

// For emitting events
const emitter = new EventEmitter()

db.connect(() => {
	// Redis connection
	const cacheStore = require('./cache-util')
	cacheStore.init(emitter)

	// Emitter will fire "once" - on a successful redis connection
	emitter.once('redis-connection-success', () => {
		// Routes
		const rocketsRoute = require('./routes/rockets.route')
		app.use('/api/rockets', rocketsRoute)

		// Start the server
		app.listen(PORT, () =>
			console.log(`[express] Server running on PORT ${PORT}`)
		)
	})
})
