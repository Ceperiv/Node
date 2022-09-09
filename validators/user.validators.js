const Joi = require('joi')

const {EMAIL, PASSWORD} = require("../constants/regex.enum");
const IDValidator = require("./common.validators");
const {ApiError} = require("../Errors");
const {statusCode} = require("../constants");

const nameValidator = Joi.string().alphanum().min(2).max(35).trim();
const ageValidator = Joi.number().integer().min(1).max(120);
const emailValidator = Joi.string().regex(EMAIL).trim().error(new ApiError('Email not valid', statusCode.BAD_REQUEST));
const passwordValidator = Joi.string().regex(PASSWORD).error(new ApiError('Password not valid', statusCode.BAD_REQUEST))

const newUserValidator = Joi.object({
    name: nameValidator.required(),
    age: ageValidator,
    email: emailValidator.required(),
    password: passwordValidator.required(),
});
const loginUserValidator = Joi.object({
    email: emailValidator.required().error(new ApiError('wrong email', statusCode.BAD_REQUEST)),
    password: passwordValidator.required().error(new ApiError('wrong password', statusCode.BAD_REQUEST)),
});
const updateUserValidator = Joi.object({
    name: nameValidator,
    age: ageValidator,
    email: emailValidator,
});


module.exports = {
    newUserValidator,
    loginUserValidator,
    updateUserValidator,
}