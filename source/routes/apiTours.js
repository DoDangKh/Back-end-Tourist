const express = require('express')
const { authenticationToken } = require('../middleware/authsever')
const verifyRoles = require('../middleware/verifyRole')
tourController = require('../controller/ControllerTours')


let router = express.Router()
// tourController.createTour
router.post('/user-tour', tourController.getTour)
router.post('/create-tour', verifyRoles(1), tourController.createTour)
module.exports = router

