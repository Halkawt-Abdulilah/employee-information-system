require('dotenv').config()
require('express-async-errors')
const express = require('express')

const app = express()
const port = process.env.PORT || 5000

//other packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

//db connection
const connectDB = require('./connection/database')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser(process.env.JWT_SECRET))

// middlewares
const notFoundMiddleware = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')

// routes
const authRoutes = require('./routes/authRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')

app.get('/test', (req, res)=>{
    res.status(200).send('test route')
    console.log(req.signedCookies)
})
app.use('/', authRoutes)
app.use('/', employeeRoutes)
app.use('/attendance', attendanceRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.listen(port, () =>  {
    try {
        connectDB(process.env.MONGO_URL)
        console.log(`Listening on port ${port}...`)
    } catch(error) {
        console.log(error);
    }
})