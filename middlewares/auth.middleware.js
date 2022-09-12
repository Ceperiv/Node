const {statusCode, constant, tokenTypeEnum} = require("../constants");
const {authService, tokenService, actionTokenService, userService, previousPasswordService} = require("../services");
const {ApiError} = require("../Errors");


module.exports = {
    checkIsAccessToken:
        async (req, res, next) => {
            try {
                const access_token = req.get(constant.AUTHORIZATION);

                if (!access_token) {
                    throw new ApiError('No token', statusCode.BAD_REQUEST)
                }
                tokenService.checkToken(access_token)

                const tokenInfo = await authService.getOneWithUser({access_token})
                if (!tokenInfo) {
                    throw new ApiError('not valid token:(', statusCode.UNAUTHORIZED)
                }

                req.tokenInfo = tokenInfo
                next()
            } catch (e) {
                next(e)
            }
        },
    checkIsRefreshToken:
        async (req, res, next) => {
            try {
                const refresh_token = req.get(constant.AUTHORIZATION);
                if (!refresh_token) {
                    throw new ApiError('No token', statusCode.UNAUTHORIZED)
                }
                tokenService.checkToken(refresh_token, tokenTypeEnum.REFRESH)

                const tokenInfo = await authService.getOneByParams({refresh_token})
                if (!tokenInfo) {
                    throw new ApiError('not valid token', statusCode.UNAUTHORIZED)
                }

                req.tokenInfo = tokenInfo
                next()
            } catch (e) {
                next(e)
            }
        },
    checkActionToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(constant.AUTHORIZATION)
            if (!token) {
                return next(new ApiError('No action token', statusCode.UNAUTHORIZED))
            }
            tokenService.checkToken(token, tokenType)

            const tokenInfo = await actionTokenService.getOneByParamsWithUser({tokenType, token})
            if (!tokenInfo) {
                throw new ApiError('|||not valid token...', statusCode.UNAUTHORIZED)
            }

            req.tokenInfo = tokenInfo;
            next()
        } catch (e) {
            next(e)
        }
    },
    checkPreviousPassword: async (req, res, next) => {
        try {
            const {my_user} = req.tokenInfo;
            const {password} = req.body;

            const oldPasswords = await previousPasswordService.getByUserId(my_user._id);
            const promises = await Promise.allSettled([...oldPasswords.map(old => tokenService.comparePassword(password, old.password)),
                tokenService.comparePassword(password, my_user.password)
            ])
            for (const {status} of promises) {
                if (status === 'fulfilled') {
                    return next(new ApiError('you have already used this password', statusCode.BAD_REQUEST))
                }
            }

            next()
        } catch (e) {
            next(e)
        }
    },
}
