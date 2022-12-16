"use strict";

var _express = _interopRequireDefault(require("express"));
var _AuthController = _interopRequireDefault(require("../app/controllers/AuthController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/register", _AuthController["default"].register);
router.post("/login", _AuthController["default"].login);
module.exports = router;