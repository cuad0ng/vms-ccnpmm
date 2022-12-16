"use strict";

var _express = _interopRequireDefault(require("express"));
var _UserController = _interopRequireDefault(require("../app/controllers/UserController"));
var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));
var _verifyRole = _interopRequireDefault(require("../middlewares/verifyRole"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _require = require("../middlewares/cloudinary"),
  uploadImage = _require.uploadImage;
var router = _express["default"].Router();

//PUBLIC

// PRIVATE
router.use(_verifyToken["default"]);
router.get("/", _UserController["default"].findOne);
router.post("/", _UserController["default"].create);
router.post("/upload-avatar", uploadImage.single("avatar"), _UserController["default"].uploadAvatar);
router.put("/:id", _UserController["default"].update);
router["delete"]("/:id", _UserController["default"]["delete"]);
module.exports = router;