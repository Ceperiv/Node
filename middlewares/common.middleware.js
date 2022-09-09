const {isObjectIdOrHexString} = require("mongoose");

const {ApiError} = require("../Errors/index");
const {statusCode} = require("../constants");

module.exports = {
    checkIsBodyValid: (validatorType) =>
        async (req, res, next) => {
            try {
                const validate = validatorType.validate(req.body)
                if (validate.error) {
                    // throw new ApiError(validate.error.details[0].message, statusCode.BAD_REQUEST)
                    return next(new ApiError(validate.error.message, statusCode.BAD_REQUEST))
                }

                req.body = validate.value
                next()
            } catch (e) {
                next(e)
            }
        },
    checkIsIdValid: (fieldName, from = 'params') => async (req, res, next) => {
        try {
            if (!isObjectIdOrHexString(req[from][fieldName])) {
                throw new ApiError('ID not valid', statusCode.CONFLICT)
            }
            next()
        } catch (e) {
            next(e)
        }
    },
}
