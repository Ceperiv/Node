const express = require('express');
const app = express();

const users = require('./dataBase')
const fileService = require('./services/file.service')
const {getAllUsers, getUserById, editUser, removeUser, createUser} = require("./controllers/user.controller");

userRouter = require('./routes/user.router')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.json('hello')
})

app.use('/users', userRouter)



app.listen(5001, () => {
    console.log('Done');
})

