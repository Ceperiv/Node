const {carService, userService} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    getCarById: async (req, res, next) => {
        try {
            const {car} = req
            // const {name} = req.car
            // console.log(name)
            // const {carId} = req.params;
            // const car = await carService.getCarById(carId)
            res.json(car);
        } catch (e) {
            next(e);
        }
    },
    createCar: async (req, res, next) => {
        try {
            const {_id, my_cars} = req.user;
            const car = await carService.createCar({...req.body, my_user: _id});
            await userService.updateUser(_id, {my_cars: [...my_cars, car._id]})
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