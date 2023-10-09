const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const EmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'please enter a valid email'
        },
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 4,
    },

    role: {
        type: String,
        enum: ['manager', 'employee'],
        default: 'lecturer'
    },
})

EmployeeSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

EmployeeSchema.methods.checkPassword = async function(inputPassword) {
    const isPasswordValid = await bcrypt.compare(inputPassword, this.password)
    return isPasswordValid
}

module.exports = mongoose.model('Employee', EmployeeSchema)