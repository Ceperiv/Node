const User = require('../dataBase/User')

module.exports = {
    createUser(userObject) {
        return User.create(userObject);
    },
    getAllUsers(filter = {}) {
        return User.find(filter)
    },
    getOneByParams(filter) {
        return User.findOne(filter);
    },
    getUserById(id) {
        return User.findById(id).select(['+my_cars']).populate('my_cars');
    },
    updateUser(userId, newUserObject) {
        return User.findOneAndUpdate({_id: userId}, newUserObject, {new: true});
    },

    deleteUser(userId) {
        return User.deleteOne({_id: userId});
    },
}
