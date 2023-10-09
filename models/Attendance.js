const mongoose = require('mongoose')

const AttendanceSchema = mongoose.Schema({
    employee: {
        type: mongoose.Types.ObjectId,
        ref: "Employee",
        requied: true,
    },
    clockInTime: {
        type: Date,
        required: true,
    },
    clockOutTime: {
        type: Date,
    }
})

module.exports = mongoose.model('Attendance', AttendanceSchema)