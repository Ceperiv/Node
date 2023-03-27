const {userService} = require("../services");
const {ApiError} = require("../Errors/index");
const {statusCode} = require("../constants");
const {User} = require("../dataBase");

module.exports = {
    checkIsUserIdPresent: (from = 'params') => async (req, res, next) => {
        try {
            const {userId} = req[from];
            const user = await userService.getUserById(userId)
            if (!user) {
                throw new ApiError('Wrong user id', statusCode.BAD_REQUEST)
            }

            req.user = user
            next()
        } catch (e) {
            next(e)
        }
    },
    checkIsUserEmailUniq: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {userId} = req.params;
            const user = await userService.getOneByParams({email, _id: {$ne: userId}})
            if (user && user._id.toString() !== userId) {
                throw new ApiError('Email already exist', statusCode.BAD_REQUEST)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    getUserDynamically: (from = 'body', fieldName = 'userId', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldForSearch = req[from][fieldName];
            const user = await User.findOne({[dbField]: fieldForSearch})
            if (!user) {
                throw new ApiError('Wrong user email', statusCode.BAD_REQUEST)
            }

            req.user = user
            next()
        } catch (e) {
            next(e)
        }
    },
}