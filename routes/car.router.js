const {Router} = require('express');

const {carController} = require("../controllers");
const {commonMdlwr, userMdlw, carMdlwr, authMdlwr} = require("../middlewares");
const {newCarValidator, updateCarValidator} = require("../validators/car.validators");

const carRouter = Router()

carRouter.get(
    '/:carId',
    commonMdlwr.checkIsIdValid('carId'),
    carMdlwr.checkIsCarIdPresent,
    carController.getCarById
);
carRouter.post(
    '/',
    commonMdlwr.checkIsBodyValid(newCarValidator),
    authMdlwr.checkIsAccessToken,
    carController.createCar);
carRouter.put(
    '/:carId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsBodyValid(updateCarValidator),
    carMdlwr.checkIsCarIdValid,
    carMdlwr.checkIsCarIdPresent,
    carController.updateCar)
carRouter.delete(
    '/:carId',
    commonMdlwr.checkIsIdValid('carId'),
    authMdlwr.checkIsAccessToken,
    carMdlwr.checkIsCarIdValid,
    carMdlwr.checkIsCarIdPresent,
    carController.deleteCar)

module.exports = carRouter

