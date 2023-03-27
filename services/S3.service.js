const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid')

const {S3_BUCKET_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME, S3_BUCKET_URL} = require("../config/config");

const S3Bucket = new S3({
    region: S3_BUCKET_REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY
});

const uploadPublicFile = (file, itemType = '', itemId = '') => {
    const fileName = generateFileName(file.name, itemType, itemId)

    return S3Bucket.upload({
        ContentType: file.mimetype,
        ACL: 'public-read',
        Bucket: S3_BUCKET_NAME,
        Key: fileName,
        Body: file.data,

    }).promise()
};
const deleteFile = (url) => {
    const path = url.split(S3_BUCKET_URL).pop()

    return S3Bucket.deleteObject({
        Bucket: S3_BUCKET_NAME,
        Key: path,
    }).promise()
};

function generateFileName(fileName = '', itemType = '', itemId = '') {
    const extension = fileName.split('.').pop() // -> jpg
    // path.extname(fileName) // -> .jpg
    return `${itemType}/${itemId}/${uuid.v1()}.${extension}`;
}

module.exports = {
    deleteFile,
    uploadPublicFile
};
