const express = require('express')
userController = require('../controller/ControllerUsers')


let router = express.Router()

router.post("/get-all", userController.getUser)
router.post("/login", userController.login)
router.put('/SignUp', userController.SignUp)
module.exports = router

