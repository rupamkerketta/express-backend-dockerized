const express = require('express')
const router = express.Router()

const rocketController = require('../controllers/rockets.controller')

router.get('/get-all-rockets', rocketController.getRockets)

module.exports = router
