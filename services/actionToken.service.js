const { ActionTokens } = require('../dataBase');
module.exports = {
    createActionToken: (dataToInsert) => ActionTokens.create(dataToInsert),

    getOneByParamsWithUser: (searchParams) => ActionTokens.findOne(searchParams).populate('my_user'),

    deleteMany: (deleteParams) => ActionTokens.deleteMany(deleteParams),

    deleteOne: (deleteParams) => ActionTokens.deleteOne(deleteParams)
};