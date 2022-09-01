const {Router} = require('express');

const {carController} = require("../controllers");
const {commonMdlwr, userMdlw, carMdlwr} = require("../middlewares");

const carRouter = Router()

carRouter.get(
    '/:carId',
    commonMdlwr.checkIsIdValid('carId'),
    carMdlwr.checkIsCarIdPresent,
    carController.getCarById
);

carRouter.post(
    '/',
    commonMdlwr.checkIsIdValid('userId', 'query'),
    carMdlwr.checkIsCarBodyValid,
    userMdlw.checkIsUserIdPresent('query'),
    carController.createCar);
carRouter.put(
    '/:carId',
    commonMdlwr.checkIsIdValid('carId'),
    carMdlwr.checkIsCarBodyValid,
    carMdlwr.checkIsCarIdValid,
    carMdlwr.checkIsCarIdPresent,
    carController.updateCar)
carRouter.delete(
    '/:carId',
    commonMdlwr.checkIsIdValid('carId'),
    carMdlwr.checkIsCarIdValid,
    carMdlwr.checkIsCarIdPresent,
    carController.deleteCar)

module.exports = carRouter

