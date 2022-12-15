"use strict";

var _express = _interopRequireDefault(require("express"));
var _UserController = _interopRequireDefault(require("../app/controllers/UserController"));
var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));
var _verifyRole = _interopRequireDefault(require("../middlewares/verifyRole"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

//PUBLIC
router.post("/", _UserController["default"].create);
router.put("/:id", _UserController["default"].update);
router["delete"]("/:id", _UserController["default"]["delete"]);

// PRIVATE
router.use(_verifyToken["default"]);
router.get("/", _UserController["default"].findOne);
module.exports = router;