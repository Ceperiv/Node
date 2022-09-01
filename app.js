const express = require('express');
const {mongoose} = require('mongoose');
const app = express();
require('dotenv').config();

const {PORT, MONGO_URL} = require('./config/config')
const {mainErrorHandler} = require("./Errors");
const {userRouter, carRouter} = require('./routes')

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.json('hello:)')
})

app.use('/users', userRouter)

app.use('/cars', carRouter)

app.use('*', (req, res, next) => {
    next(new Error('Route not found'))
})

app.use(mainErrorHandler)

app.listen(PORT, () => {
    console.log('DONE... port', PORT);
    mongoose.connect(MONGO_URL);
});


