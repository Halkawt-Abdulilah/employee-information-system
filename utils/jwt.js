const jwt = require('jsonwebtoken')

const createToken = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })

    return token
}

const isValidToken = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookieToResponse = ({ res, employee }) => {
    const token = createToken({payload: employee})

    const oneDay = 1000 * 60 * 60 * 24

    res.cookie('tokenCookie', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.DEV_STAGE === 'production',
        signed: true,
    })

}

module.exports = {
    createToken,
    isValidToken,
    attachCookieToResponse
}