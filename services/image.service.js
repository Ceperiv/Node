const {Image} = require("../dataBase");

module.exports = {
    savePhotoInfo(avatar) {
        return Image.create(avatar)
    },
    getById(id) {
        return Image.findById(id)
    },
    getByUserId(userId) {
        return Image.find({my_user: userId}, {my_user: 0}).sort({createdAt: -1})
    },
    getByUserIdPreviousAvatar(userId) {
        return Image.find({my_user: userId}).sort({createdAt: -1}).skip(1).limit(1)
    },
    deleteImage(filter) {
        return Image.deleteOne(filter)
    },
}
