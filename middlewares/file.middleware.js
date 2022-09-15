const {statusCode, fileConstants} = require("../constants");
const {ApiError} = require("../Errors");

module.exports = {
    checkUploadedAvatar: async (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                throw new ApiError('no avatar', statusCode.BAD_REQUEST);
            }
            const {avatar} = req.files;
            if (avatar.size > fileConstants.IMAGE_MAX_SIZE) {
                throw new ApiError('file to big', statusCode.BAD_REQUEST);
            }
            if (!fileConstants.IMAGES_MIMETYPES.includes(avatar.mimetype)) {
                throw new ApiError('wrong file type', statusCode.BAD_REQUEST);
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}
