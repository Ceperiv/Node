const {Router} = require('express');

const {authController} = require("../controllers");
const {userMdlw, authMdlwr} = require("../middlewares");

const authRouter = Router()

authRouter.post(
    '/login',
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
    authMdlwr.checkIsAccessToken,
    authController.logout
);

module.exports = authRouter

