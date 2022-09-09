const {Router} = require('express');

const {authController} = require("../controllers");
const {userMdlw, authMdlwr, commonMdlwr} = require("../middlewares");
const {loginUserValidator} = require("../validators/user.validators");

const authRouter = Router()

authRouter.post(
    '/login',
    commonMdlwr.checkIsBodyValid(loginUserValidator),
    userMdlw.getUserDynamically('body', 'email'),
    authController.login
);
authRouter.post(
    '/refresh',
    authMdlwr.checkIsRefreshToken,
    authController.refresh
);
authRouter.post(
    '/logout',
    // userMdlw.getUserDynamically('body', 'email'),
    authMdlwr.checkIsAccessToken,
    authController.logout
);

module.exports = authRouter

