const pool = require('../config/connectDB')
const jwt = require('jsonwebtoken')


let getUser = async (req, res) => {
    console.log('get user')
    try {
        const [user] = await pool.execute('Select * from users')
        console.log(req.body)
        return res.status(200).json({
            Res: 'success'
        })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({
            text: 'Error'
        })
    }
}


let login = async (req, res) => {
    console.log(req.body)
    const username = req.body.Username
    const password = req.body.Password
    // console.log(typeof ()
    try {
        console.log(username, password)
        const [account] = await pool.execute('Select * from account where Email= ? and Password=?', [username, password])
        if (Object.keys(account).length == 0) {
            return res.status(401).json({
                text: 'Wrong account'
            })
        }
        const [user] = await pool.execute('Select * from users where idUser=?', [account[0].idUsers])
        user[0].username = username
        user[0].role = account[0].Role
        console.log(account[0])
        console.log(process.env.ACCESS_TOKEN_SECRET)
        const accessToken = jwt.sign(user[0], process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        return res.status(200).json({
            user: user[0],
            token: accessToken
        })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({
            text: 'Error'
        })
    }
}

let SignUp = async (req, res) => {
    try {
        const [account] = await pool.execute('SELECT * FROM account WHERE Email=?', [req.body.Email])
        const [user] = await pool.execute('SELECT * FROM Users WHERE Phonenum=?', [req.body.Phonenum])
        if (Object.keys(account).length == 0 && Object.keys(user).length == 0) {
            await pool.execute('Insert into Users(Name, Phonenum, address) VALUES(?,?,?)', [req.body.Name, req.body.Phonenum, req.body.Address])
            const [user] = await pool.execute('SELECT idUser FROM Users Where PhoneNum = ?', [req.body.Phonenum])
            await pool.execute('INSERT INTO account (idUsers, Email, Password, Role) VALUES(?,?,?,?)', [user[0].idUser, req.body.Email, req.body.Password, 0])
            return res.status(200).json({
                text: "Sign up success"
            })
        }
        else {
            return res.status(409).json({
                text: "User or Email already exist"
            })
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({
            text: err.message
        })
    }
}

module.exports = {
    getUser,
    login,
    SignUp
}