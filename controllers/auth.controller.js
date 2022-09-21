const {
    tokenService,
    authService,
    emailService,
    actionTokenService,
    userService,
    previousPasswordService,
    smsService,
} = require("../services");
const {emailActionEnum, tokenTypeEnum, constant, statusCode, phoneSms, smsTemplate} = require("../constants");
const {FRONTEND_URL} = require("../config/config");
const {User} = require("../dataBase");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password, email} = req.body;
            const {_id, phone, name} = req.user
            const authTokens = tokenService.createAuthTokens({_id})

            await req.user.checkIsPasswordSame(password)
            await authService.saveTokens({...authTokens, my_user: _id});
            // await emailService.sentEmail(email, emailActionEnum.WELCOME, {userName: name})
            await smsService.sendSms(phone, smsTemplate.hello(name));


            res.json({
                ...authTokens,
                user: req.user
            })
        } catch (e) {
            next(e)
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {my_user, refresh_token} = req.tokenInfo;
            await authService.deleteOneByParams({refresh_token})
            const authTokens = tokenService.createAuthTokens({_id: my_user})
            const newTokens = await authService.saveTokens({...authTokens, my_user})

            res.json({newTokens})
        } catch (e) {
            next(e)
        }
    },
    logout: async (req, res, next) => {
        try {
            const {_id, access_token} = req.tokenInfo;
            // await Auth.deleteMany({_id, access_token})
            await authService.deleteOneByParams({_id, access_token})

            res.json('logout ok)')
        } catch (e) {
            next(e)
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const {email, _id} = req.user
            const actionToken = tokenService.createActionToken(tokenTypeEnum.FORGOT_PASSWORD, {_id});
            const url = `${FRONTEND_URL}/password/forgot-pass-page?token=${actionToken}`;

            await emailService.sentEmail(email, emailActionEnum.FORGOT_PASSWORD, {url})
            await actionTokenService.createActionToken({
                tokenType: tokenTypeEnum.FORGOT_PASSWORD,
                my_user: _id,
                token: actionToken,
            })

            res.json({token: actionToken, 'status ': 'sent'})
        } catch (e) {
            next(e)
        }
    },
    setNewPasswordForgot: async (req, res, next) => {
        try {
            const {my_user} = req.tokenInfo;
            const {password} = req.body;
            const token = req.get(constant.AUTHORIZATION)

            await previousPasswordService.savePasswordInfo({password: my_user.password, my_user: my_user._id})
            await authService.deleteMany({my_user: my_user._id})
            await actionTokenService.deleteOne({token})

            const hashPassword = await tokenService.hashPassword(password);

            await userService.updateUserById(my_user._id, {password: hashPassword});

            res.json('done...').status(statusCode.CREATE)
        } catch (e) {
            next(e)
        }
    },
}
