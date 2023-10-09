const Attendance = require('../models/Attendance')
const LeaveRequest = require('../models/LeaveRequest')
const {CustomError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const recordAttendance = async (req, res) => {

    const {clockInDateTime, clockOutDateTime} = req.body
    if(!clockInDateTime || !clockOutDateTime) {
        throw new CustomError.BadRequestError('please choose DateTime')
    }
    //todo: timezones stuff
    clockIn = new Date(clockInDateTime)
    clockOut = new Date(clockOutDateTime)

    if(clockIn < new Date()) {
        throw new CustomError.BadRequestError('please choose a valid DateTime')
    }

    const {employeeId} = req.employee
    const attendance = await Attendance.create({employee: employeeId, clockInTime: clockIn, clockOutTime: clockOut})


    res.status(StatusCodes.OK).json({attendance})
}

const requestLeave = async (req, res) => {
    const {employeeId} = req.employee
    //todo: timezones stuff
    const {leaveType, startDate, endDate} = req.body

    if(!leaveType || !startDate || !endDate) {
        throw new CustomError.BadRequestError('please enter valid info')
    }

    const leaveRequest = await LeaveRequest.create({employee:employeeId, leaveType, startDate, endDate})
    res.status(StatusCodes.OK).json({leaveRequest})
}

const getLeaveRequests = async (req, res) => {
    const {employeeId} = req.employee

    const leaveRequests = await LeaveRequest.find({employee:employeeId})

    if(!leaveRequests) {
        throw new CustomError.NotFoundError('No Leave Requests Found')
    }

    res.status(StatusCodes.OK).json({count:leaveRequests.length, leaveRequests})
}

module.exports = {
    recordAttendance,
    requestLeave,
    getLeaveRequests,
}