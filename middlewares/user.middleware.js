const {userService} = require("../services");
const {ApiError} = require("../Errors/index");
const {statusCode} = require("../constants");

module.exports = {
    checkIsUserBodyValid:
        async (req, res, next) => {
            try {
                const {age, name, id} = req.body;
                if (Number.isNaN(+age) || age <= 0) {
                    throw new ApiError('Wrong user age', statusCode.BAD_REQUEST)
                }
                if (name.length < 2) {
                    throw new ApiError('wrong user name', statusCode.BAD_REQUEST)
                }
                next()
            } catch (e) {
                next(e)
            }
        },
    checkIsUserIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params;
            if (userId < 0 || Number.isNaN(userId)) {
                throw new ApiError('Wrong user id', statusCode.BAD_REQUEST)
            }
            next()
        } catch (e) {
            next(e)
        }
    },
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
            const user = await userService.getOneByParams({email})

            if (user && user._id.toString() !== userId ) {
               throw new ApiError('Email already exist', statusCode.BAD_REQUEST)
            }
            next()
        } catch (e) {
            next(e)
        }
    }
}