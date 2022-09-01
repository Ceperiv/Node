const {carService} = require("../services");
const {ApiError} = require("../Errors/index");
const {statusCode} = require("../constants");

module.exports = {
    checkIsCarBodyValid:
        async (req, res, next) => {
            try {
                const {name, year, model} = req.body;
                if (Number.isNaN(+year) || year < 1950 || year > new Date().getFullYear()) {
                    throw new ApiError('Wrong car year(1950 till current year)', statusCode.BAD_REQUEST)
                }
                if (name.length < 2 || name.length > 25) {
                    throw new ApiError('wrong car name', statusCode.BAD_REQUEST)
                }
                if (model.length < 1 || model.length > 25) {
                    throw new ApiError('wrong model name', statusCode.BAD_REQUEST)
                }
                next()
            } catch (e) {
                next(e)
            }
        },
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