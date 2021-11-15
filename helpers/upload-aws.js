
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const region          = process.env.AWS_REGION; 
const accessKeyId     = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const storage = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const uploadToBucket = (nameBucket, file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket: nameBucket,
        Key: file.name,
        Body: stream
    };
    return storage.upload(params).promise();
}

const deleteFileToBucket = (nameBucket, nombre) => {
    console.log(nombre)
    const params = {
        Bucket: nameBucket,
        Key: nombre,
    };
    return storage.deleteObject(params).promise();
} 

module.exports = {
    uploadToBucket,
    deleteFileToBucket
}