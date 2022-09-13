const express = require('express');
const {mongoose} = require('mongoose');
const app = express();
require('dotenv').config({path:'./.env'});

const {PORT, MONGO_URL, NODE_ENV} = require('./config/config')
const runCronJobs = require('./cron')
const {mainErrorHandler} = require("./Errors");
const {userRouter, carRouter, authRouter} = require('./routes')

if (NODE_ENV !== 'production') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.json('hello:)')
})


app.use('/auth', authRouter)
app.use('/cars', carRouter)
app.use('/users', userRouter)

app.use('*', (req, res, next) => {
    next(new Error('Route not found'))
})

app.use(mainErrorHandler)

app.listen(PORT, () => {
    console.log('DONE... port', PORT);
    mongoose.connect(MONGO_URL);

    runCronJobs()
});


