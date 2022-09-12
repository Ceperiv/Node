const Joi = require('joi')

const nameValidator = Joi.string().alphanum().min(2).max(35).trim();
const yearValidator = Joi.number().integer().min(1950).max( new Date().getFullYear());
const modelValidator = Joi.string().alphanum().min(2).max(35).trim();

const newCarValidator = Joi.object({
    name: nameValidator.required(),
    year: yearValidator.required(),
    model: modelValidator.required(),

});
const updateCarValidator = Joi.object({
    name: nameValidator,
    year: yearValidator,
    model: modelValidator,

});


module.exports = {
    newCarValidator,
    updateCarValidator,
}