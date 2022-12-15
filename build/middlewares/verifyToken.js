"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _handleError = require("./handleError");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers.authorization;
  if (!token) return (0, _handleError.notAuth)("Require Authorization", res);
  var accessToken = token.split(" ")[1];
  _jsonwebtoken["default"].verify(accessToken, process.env.JWT_SECRET, function (err, user) {
    if (err) return (0, _handleError.notAuth)("Access token expired or invalid", res);
    req.user = user;
    next();
  });
};
var _default = verifyToken;
exports["default"] = _default;