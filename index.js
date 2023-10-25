const express = require('express')
const initAPIRoute = require('./source/routes/api')
require("dotenv").config()
const port = 3000

const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
initAPIRoute(app)
app.listen(port, () => console.log('Server is now lisetening on port ' + port))
