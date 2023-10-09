const express = require('express')
const router = express.Router()
const {
    recordAttendance,
    requestLeave,
    getLeaveRequests,
} = require('../controllers/attendanceController')
const {authenticateUser, authorizePerms} = require('../middlewares/authentication')


router.post('/record-attendance', authenticateUser, authorizePerms('employee'), recordAttendance)
router.post('/request-leave', authenticateUser, authorizePerms('employee'), requestLeave)
router.get('/leave-requests', authenticateUser, authorizePerms('employee'), getLeaveRequests)

module.exports = router