const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storageImage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vms-ccnpmm",
  },
});

const storageVideo = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vms-ccnpmm",
    resource_type: "video",
  },
});

const uploadImage = multer({ storage: storageImage });
const uploadVideo = multer({ storage: storageVideo });

module.exports = { uploadImage, uploadVideo };
