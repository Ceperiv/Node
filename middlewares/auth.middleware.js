const {statusCode, constant, tokenTypeEnum} = require("../constants");
const {authService, tokenService} = require("../services");
const {ApiError} = require("../Errors");

module.exports = {
    checkIsAccessToken:
        async (req, res, next) => {
            try {
                const access_token = req.get(constant.AUTHORIZATION);

                if (!access_token) {
                    throw new ApiError('No token', statusCode.BAD_REQUEST)
                }
                tokenService.checkToken(access_token, tokenTypeEnum.REFRESH)
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
                const refresh_token = req.get(statusCode.UNAUTHORIZED);

                if (!refresh_token) {
                    throw new ApiError('No token', statusCode.BAD_REQUEST)
                }
                tokenService.checkToken(refresh_token)
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
}