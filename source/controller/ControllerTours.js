const pool = require('../config/connectDB')
const jwt = require('jsonwebtoken')
const { authenticationToken } = require('../middleware/authsever')

let getTour = async (req, res) => {
    idUser = req.body.idUser
    role = req.body.role
    console.log(idUser)
    console.log(role)
    let tours = {}
    if (role == 0) {
        const [toursid] = await pool.execute('SELECT * FROM tours_users WHERE idUser=?', [idUser])
        console.log(typeof (toursid))
        for (let i = 0; i < Object.keys(toursid).length; i++) {
            console.log(toursid[i].idTour)
            const [result] = await pool.execute('SELECT * FROM tour WHERE idTour=?', [toursid[i].idTour])
            console.log(result[0])
            tours[i] = result[0]
            console.log(tours)
        }
        return res.status(500).json({
            status: 'Success',
            tour: tours
        })
    }
    else {
        const [tours] = await pool.execute('SELECT * FROM tour WHERE idTourGuideAccount=?', [idUser])
        return res.status(500).json({
            status: 'Success',
            tour: tours
        })
    }
}

let createTour = async (req, res) => {
    idUser = req.body.idUser

    try {

        // await pool.execute('INSERT INTO tour(Name, Description, idTourGuideAccount, StartDate, EndDate) VALUES(?,?,?,?,?)')
        console.log(1)
        return res.senStatus(500)
    }
    catch (err) {
        console.log(err)
        return res.senStatus(401)
    }
}

module.exports = {
    getTour,
    createTour,
}