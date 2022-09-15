const {userService, tokenService, s3Service, imageService} = require("../services");
const {statusCode} = require("../constants");
const {User} = require("../dataBase");
const {ApiError} = require("../Errors");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const {user} = req

            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const user = await User.createUserWithHashPassword(req.body)

            res.status(statusCode.CREATE).json(user)
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params
            const user = await userService.updateUser(userId, req.body)
            res.status(statusCode.CREATE).json(user)
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params
            await userService.deleteUser(userId)
            res.status(statusCode.NO_CONTENT).json('done')
        } catch (e) {
            next(e)
        }
    },
    uploadAvatar: async (req, res, next) => {
        try {
            const {userId} = req.params

            const data = await s3Service.uploadPublicFile(req.files.avatar, 'my_user', 'userId')

            await imageService.savePhotoInfo({image: data.Location, my_user: userId})

            await userService.updateUserById(userId, {avatar: data.Location})

            res.json(data)
        } catch (e) {
            next(e)
        }
    },
    getImages: async (req, res, next) => {
        try {
            const {userId} = req.params

            const images = await imageService.getByUserId(userId)

            res.json(images)
        } catch (e) {
            next(e)
        }
    },
    deleteImages: async (req, res, next) => {
        try {
            const {imageId} = req.params;
            const {avatar, _id} = req.user;

            const imageInfo = await imageService.getById(imageId);

            if (!imageInfo) {
                throw new ApiError('Image not found', statusCode.BAD_REQUEST)
            }
            if (avatar === imageInfo.image) {
                console.log(imageInfo.image, '1111')

                const oldAvatar = await imageService.getByUserIdPreviousAvatar(_id)
                console.log(oldAvatar, '222')
                // console.log(imageObj[0].image, '333')

                if (oldAvatar.length !== 0) {
                    await userService.updateUserById(_id, {avatar: oldAvatar[0].image})
                } else {
                    await userService.updateUserById(_id, {avatar: ''})
                }
            }

            await Promise.all([await imageService.deleteImage({_id: imageId}),
                    await s3Service.deleteFile(imageInfo.image)
                ]
            );


            res.json({imageInfo, status: 'deleted'})
        } catch (e) {
            next(e)
        }
    },
}