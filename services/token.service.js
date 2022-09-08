const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const {ApiError} = require("../Errors");
const {statusCode, tokenTypeEnum} = require("../constants");
const {
    ACCESS_SECRET_WORD,
    REFRESH_SECRET_WORD,
    ACCESS_TOKEN_LIFETIME,
    REFRESH_TOKEN_LIFETIME
} = require("../config/config");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (password, hashPassword) => {

        const isPasswordsSame = await bcrypt.compare(password, hashPassword)
        if (!isPasswordsSame) {
            throw new ApiError('wrong email or password', statusCode.BAD_REQUEST)
        }
    },
    createAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCESS_SECRET_WORD, {expiresIn: ACCESS_TOKEN_LIFETIME});
        const refresh_token = jwt.sign(payload, REFRESH_SECRET_WORD, {expiresIn: REFRESH_TOKEN_LIFETIME});
        return {
            access_token,
            refresh_token
        }
    },
    checkToken: (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secretWord;
            if (tokenType === tokenTypeEnum.ACCESS) secretWord = ACCESS_SECRET_WORD
            if (tokenType === tokenTypeEnum.REFRESH) secretWord = REFRESH_SECRET_WORD
        } catch (e) {
            throw new ApiError('Token is not valid', statusCode.UNAUTHORIZED)
        }
    }
};