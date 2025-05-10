const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')


exports.authCheck = async (req, res, next) => {
    try {
        //code
        const headerToken = req.headers.authorization
        if (!headerToken) {
            return res.status(401).json({ message: "No Token, Authorization22" })
        }
        const token = headerToken.split(" ")[1]
        const decode = jwt.verify(token, process.env.SECRET)
        req.user = decode

        const user = await prisma.user.findFirst({
            where: {
                phonenumber: req.user.phonenumber
            }
        })
        if (!user.status) {
            return res.status(400).json({ message: 'This account cannot access' })
        }

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Token Invalid' })
    }
}

exports.adminCheck = async (req, res, next) => {
    try {

        const { phonenumber } = req.user
        if (!phonenumber || phonenumber === "") {
            return res.status(400).json({message: 'Something went wrong.'})
        }

        const adminUser = await prisma.user.findFirst({
            where: { phonenumber: phonenumber }
        })

        if (!adminUser || adminUser.role !== 'admin') {
            return res.status(403).json({ message: 'Acess Denied: Admin Only' })
        }
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error Admin access denied' })
    }
}
