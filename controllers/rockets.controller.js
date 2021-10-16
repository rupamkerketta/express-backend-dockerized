const { GET_ASYNC, SET_ASYNC } = require('../cache-util').getClient()
const axios = require('axios')

module.exports.getRockets = async (req, res) => {
	try {
		const reply = await GET_ASYNC('rockets')
		if (reply) {
			console.log('[express] using cached data...')
			res.send(JSON.parse(reply))
			return
		}

		const rockets = await axios.get('https://api.spacexdata.com/v3/rockets')
		const saveResult = await SET_ASYNC(
			'rockets',
			JSON.stringify(rockets.data),
			'EX',
			10
		)
		console.log(`[express] new data cached ${saveResult}`)
		res.send(rockets.data)
	} catch (err) {
		console.log(err)
	}
}
