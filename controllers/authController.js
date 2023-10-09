const Employee = require('../models/Employee')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const {attachCookieToResponse} = require('../utils')

const register = async (req, res) => {

    const {name, email, password} = req.body
    const emailExists = await Employee.findOne({email})
    if(emailExists) {
        throw new CustomError.BadRequestError('Email already exists')
    }

    const isInitialAccount = (await Employee.countDocuments({}) === 0)
    const role = isInitialAccount ? 'manager' : 'employee'

    const employee = await Employee.create({name, email, password, role})

    const employeeToken = {name: employee.name, employeeId: employee._id, role: employee.role}
    attachCookieToResponse({ res, employee:employeeToken })

    res.status(StatusCodes.CREATED).json({employee: employeeToken})
}

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new CustomError.BadRequestError('please provide email and/or password')
    }
    const employee = await Employee.findOne({email})

    if(!employee) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    const isValidPassword = await employee.checkPassword(password)

    if(!isValidPassword) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    const employeeToken = {name: employee.name, employeeId: employee._id, role: employee.role}
    attachCookieToResponse({ res, employee:employeeToken })


    res.status(StatusCodes.OK).json({employee: employeeToken})

}

const logout = async (req, res) => {
    res.cookie('tokenCookie', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 3000)
    })
    res.status(StatusCodes.OK).json({msg: 'user logged out'})
}

module.exports = {
    register,
    login,
    logout,
}