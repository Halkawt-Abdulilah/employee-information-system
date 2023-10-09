const Employee = require('../models/Employee')
const { CustomError }= require('../errors')
const { StatusCodes } = require('http-status-codes')

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find({role:'employee'}).select('-password')
    res.status(StatusCodes.OK).json({ count:employees.length, employees })
}

const getEmployee = async (req, res) => {
    // todo: get full details on employee (attendance, leaves)
    const employee = await Employee.find({_id: req.params.id}).select('-password')
    if(!employee) {
        throw new CustomError
    }
    res.status(StatusCodes.OK).json({ employee })
}

const updateLeaveRequest = async (req, res) => {
    // todo
}


const updateEmployeePassword = async (req, res) => {
    // todo
}

module.exports = {
    getAllEmployees,
    getEmployee,
}