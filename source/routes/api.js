const routeUser = require('./apiUsers')
const routeTour = require('./apiTours')
const { authenticationToken } = require('../middleware/authsever')

function initAPIRoute(app) {
    app.use('/api/v1/user', routeUser)
    app.use('/api/v1/tour', authenticationToken, routeTour)
}

module.exports = initAPIRoute