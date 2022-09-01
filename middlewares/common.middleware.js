const {isObjectIdOrHexString} = require("mongoose");

const {ApiError} = require("../Errors/index");
const {statusCode} = require("../constants");

module.exports = {
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
