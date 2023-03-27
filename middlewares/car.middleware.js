const {carService} = require("../services");
const {ApiError} = require("../Errors/index");
const {statusCode} = require("../constants");

module.exports = {
    checkIsCarIdValid: async (req, res, next) => {
        try {
            const {carId} = req.params;
            if (carId < 0 || Number.isNaN(carId)) {
                throw new ApiError('Wrong car id', statusCode.BAD_REQUEST)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    checkIsCarIdPresent: async (req, res, next) => {
        try {
            const {carId} = req.params;
            const car = await carService.getCarById(carId)
            if (!car) {
                throw new ApiError('Wrong car id', statusCode.BAD_REQUEST)
            }

            req.car = car
            next()
        } catch (e) {
            next(e)
        }
    }
}