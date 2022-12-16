"use strict";

var cloudinary = require("cloudinary").v2;
var _require = require("multer-storage-cloudinary"),
  CloudinaryStorage = _require.CloudinaryStorage;
var multer = require("multer");
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
var storageImage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vms-ccnpmm"
  }
});
var storageVideo = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vms-ccnpmm",
    resource_type: "video"
  }
});
var uploadImage = multer({
  storage: storageImage
});
var uploadVideo = multer({
  storage: storageVideo
});
module.exports = {
  uploadImage: uploadImage,
  uploadVideo: uploadVideo
};