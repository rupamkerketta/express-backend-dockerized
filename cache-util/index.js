const redis = require('redis')
const { promisify } = require('util')
const { REDIS_PASSWORD } = require('../config')
const redisConnectionURL = `redis://redis-data-store`

const clients = {}
const gs = {}

const instanceEventListeners = ({ conn, emitter }) => {
	conn.on('connect', () => {
		console.log('[redis] connection status: connected')
		clients.cacheInstance = conn

		const GET_ASYNC = promisify(clients.cacheInstance.get).bind(
			clients.cacheInstance
		)
		const SET_ASYNC = promisify(clients.cacheInstance.set).bind(
			clients.cacheInstance
		)

		gs.GET_ASYNC = GET_ASYNC
		gs.SET_ASYNC = SET_ASYNC

		emitter.emit('redis-connection-success')
	})

	conn.on('end', () => {
		console.log('[redis] connection status: disconnected')
	})

	conn.on('reconnecting', () => {
		console.log('[redis] connection status: error ', {
			err
		})
	})
}

module.exports = {
	init: function (emitter) {
		const cacheInstance = redis.createClient({
			url: redisConnectionURL,
			password: REDIS_PASSWORD
		})
		clients.cacheInstance = cacheInstance
		instanceEventListeners({ conn: cacheInstance, emitter })
	},
	getClient: () => ({ GET_ASYNC: gs.GET_ASYNC, SET_ASYNC: gs.SET_ASYNC })
}
