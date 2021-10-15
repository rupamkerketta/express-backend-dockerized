const mongoose = require('mongoose')
const {
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_IP,
	MONGO_PORT
} = require('../config')
const connectionURL = `mongodb://${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connect = async (callback) => {
	// When successfully connected
	mongoose.connection.on('connected', function () {
		console.log(`[mongoose] Connected to the Database '${this.name}'...`)
		callback()
	})

	// When the connection is disconnected
	mongoose.connection.on('disconnected', function () {
		console.log('[mongoose] Connection closed!!')
	})

	try {
		await mongoose.connect(
			connectionURL,
			{ user: MONGO_USERNAME, pass: MONGO_PASSWORD },
			{
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		)
	} catch (err) {
		// If the connection throws an error
		console.log(`[mongoose] ${err}`)
	}
}

module.exports = {
	connect
}
