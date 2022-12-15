"use strict";

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var express = require("express");
var router = express.Router();
var imageController = require("../app/controllers/ImageController");
var _require = require("../middlewares/cloudinary"),
  uploadImage = _require.uploadImage;
router.get("/", imageController.findAll);
router.get("/:id", imageController.findOne);
router.use(_verifyToken["default"]);
router.post("/", uploadImage.single("image"), imageController.create);
router.put("/:id", imageController.update);
router["delete"]("/:id", imageController["delete"]);
module.exports = router;