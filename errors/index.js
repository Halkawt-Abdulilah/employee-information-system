const CustomAPIError = require('./customAPIError')
const BadRequestError = require('./badRequest')
const NotFoundError = require('./notFound')
const UnauthenticatedError = require('./unauthenticated')
const UnauthorizedError = require('./unauthorized')

module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
    UnauthorizedError,
}