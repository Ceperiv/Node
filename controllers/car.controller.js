const {carService, userService} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    getCarById: async (req, res, next) => {
        try {
            const {car} = req

            res.json(car);
        } catch (e) {
            next(e);
        }
    },
    createCar: async (req, res, next) => {
        try {
            const {_id} = req.tokenInfo;
            console.log(_id)

            const car = await carService.createCar({...req.body, my_user: _id});

            const userCars = await carService.getCarsByParams({user:_id});

            await userService.updateUser(_id, {my_cars: [...userCars, car._id]})
            res.status(statusCode.CREATE).json(car)
        } catch (e) {
            next(e)
        }
    },
    updateCar: async (req, res, next) => {
        try {
            const {carId} = req.params
            const car = await carService.updateCar(carId, req.body)
            res.status(statusCode.CREATE).json(car)
        } catch (e) {
            next(e)
        }
    },
    deleteCar: async (req, res, next) => {
        try {
            const {carId} = req.params
            await carService.deleteCar(carId)
            res.status(statusCode.NO_CONTENT).json('done')
        } catch (e) {
            next(e)
        }
    }
}