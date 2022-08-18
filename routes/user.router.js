const {Router} = require('express');
const {createUser, editUser, getAllUsers, getUserById, removeUser} = require("../controllers/user.controller");
const {checkIsUserBodyValid} = require("../middlewares/user.middleware");
const userMdlw = require('../middlewares/user.middleware')


const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUserById)
userRouter.post('/', userMdlw.checkIsUserBodyValid, createUser);
userRouter.put('/:userId', editUser)
userRouter.delete('/:userId', removeUser)

module.exports = userRouter

