const express = require('express')
const colors=require('colors')
const dotenv = require('dotenv')
dotenv.config()
const {appErrorHandler} = require('./middleware/errorMiddleware')
const passport = require('passport')
const mongoDBConnection=require('./config/db')
mongoDBConnection()//connects to mongodb
const bodyParser = require('body-parser'); 
const app = express()

//middleware
app.use(passport.initialize());
app.use(express.json())
app.use(bodyParser.json()); 
app.use(express.urlencoded({extended:false}))

//get all contacts
app.use('/api/contacts',require('./routes/contactRoutes'))
//get users
app.use('/api/accounts',require('./routes/userRoutes'))

//error handler has to go here
app.use(appErrorHandler)

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server listening on port: ${PORT}...`)
})
