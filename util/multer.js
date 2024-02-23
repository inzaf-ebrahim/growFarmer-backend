require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const myBucket = process.env.MYBUCKET;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// console.log(myBucket);
// console.log(region);
const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});
// console.log(s3);
const uploads = multer({
  storage: multerS3({
    s3: s3,
    bucket: myBucket,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `image-${Date.now()}.jpeg`);
    },
  }),
});
// console.log(req);
module.exports = { uploads, s3 };
