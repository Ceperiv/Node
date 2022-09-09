const {Router} = require('express');

const {userController} = require("../controllers");
const {userMdlw, commonMdlwr, authMdlwr} = require("../middlewares");
const {newUserValidator, updateUserValidator} = require("../validators/user.validators");

const userRouter = Router()

userRouter.get(
    '/',
    userController.getAllUsers)
userRouter.get(
    '/:userId',
    commonMdlwr.checkIsIdValid('userId'),
    userMdlw.checkIsUserIdPresent(),
    userController.getUserById)
userRouter.post(
    '/',
    commonMdlwr.checkIsBodyValid(newUserValidator),
    userMdlw.checkIsUserEmailUniq,
    userController.createUser);
userRouter.put(
    '/:userId',
    commonMdlwr.checkIsIdValid('userId'),

    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsBodyValid(updateUserValidator),
    userMdlw.checkIsUserEmailUniq,
    userController.updateUser)
userRouter.delete(
    '/:userId',
    commonMdlwr.checkIsIdValid('userId'),
    authMdlwr.checkIsAccessToken,
    userMdlw.checkIsUserIdPresent(),
    userController.deleteUser)

module.exports = userRouter

