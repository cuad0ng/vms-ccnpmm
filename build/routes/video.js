"use strict";

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var express = require("express");
var router = express.Router();
var videoController = require("../app/controllers/VideoController");
var _require = require("../middlewares/cloudinary"),
  uploadVideo = _require.uploadVideo;
router.get("/", videoController.findAll);
router.get("/:id", videoController.findOne);
router.use(_verifyToken["default"]);
router.post("/", uploadVideo.single("video"), videoController.create);
router.put("/:id", videoController.update);
router["delete"]("/:id", videoController["delete"]);
module.exports = router;