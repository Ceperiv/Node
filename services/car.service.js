const Car = require('../dataBase/Car')

module.exports = {
    createCar(carObject) {
        return Car.create(carObject);
    },
    getOneByParams(filter) {
        return Car.findOne(filter);
    },
    getCarById(id) {
        return Car.findById(id).populate('my_user');
    },
    updateCar(carId, newCarObject) {
        return Car.findOneAndUpdate({_id: carId}, newCarObject, {new: true});
    },
    deleteCar(carId) {
        return Car.deleteOne({_id: carId});
    },
}
