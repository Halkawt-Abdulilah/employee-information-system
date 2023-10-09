const express = require('express')
const router = express.Router()
const {
    getAllEmployees,
    getEmployee,
} = require('../controllers/employeeController')
const {authenticateUser, authorizePerms} = require('../middlewares/authentication')


router.get('/employees', authenticateUser, authorizePerms('manager'), getAllEmployees)
router.get('/employees/:id', authenticateUser, authorizePerms('manager'), getEmployee)

module.exports = router