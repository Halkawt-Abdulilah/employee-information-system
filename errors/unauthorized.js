const { StatusCodes } = require('http-status-codes')
const CustomError = require('./customAPIError')

class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError