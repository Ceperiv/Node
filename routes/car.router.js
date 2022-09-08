const {Router} = require('express');

const {carController} = require("../controllers");
const {commonMdlwr, userMdlw, carMdlwr, authMdlwr} = require("../middlewares");

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
    authMdlwr.checkIsAccessToken,
    carMdlwr.checkIsCarBodyValid,
    userMdlw.checkIsUserIdPresent('query'),
    carController.createCar);
carRouter.put(
    '/:carId',
    commonMdlwr.checkIsIdValid('carId'),
    authMdlwr.checkIsAccessToken,
    carMdlwr.checkIsCarBodyValid,
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

