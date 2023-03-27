const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const {mongoose, get} = require('mongoose');
const app = express();
const fileUpload = require('express-fileupload');

require('dotenv').config({path: './.env'});

const {PORT, MONGO_URL, NODE_ENV} = require('./config/config')
const runCronJobs = require('./cron')
const {mainErrorHandler} = require("./Errors");
const {userRouter, carRouter, authRouter} = require('./routes')
const {userJoinRoom} = require("./controllers/socket.controller");

const server = http.createServer(app)

const io = socketIo(server, {cors: 'http://localhost:63342'})

io.on('connection', (socket) => {
    console.log(socket.id);
    console.log(socket.handshake);

    socket.on('message:create', (data) => {
        console.log(data)
        //emit event to sender
        // socket.emit('user:create', {name:'socket', hard:10})

        //emit event to all users include sender
        // io.emit('user:create', {name:'socket', hard:10})

        //emit event to all users exclude sender
        // socket.broadcast.emit('user:create', {name:'socket', hard:10})

        socket.on('room:join', (data) => {
            userJoinRoom(io, socket, data)
        })

    });
})

if (NODE_ENV !== 'production') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}


app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(fileUpload({}))

app.get('/', (req, res) => {
    res.json('hello:)')
})

app.use('/auth', authRouter)
app.use('/cars', carRouter)
app.use('/users', userRouter)

app.get('/health', (req, res) => res.json('OK'));

app.use('*', (req, res, next) => {
    next(new Error('Route not found'))
})

app.use(mainErrorHandler)

server.listen(PORT, () => {
    console.log('DONE... port', PORT);
    mongoose.connect(MONGO_URL);

    runCronJobs()
});
