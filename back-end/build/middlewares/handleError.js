"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFound = exports.notAuth = exports.internalServerError = exports.badRequest = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var badRequest = function badRequest(err, res) {
  var error = _httpErrors["default"].BadRequest(err);
  return res.status(error.status).json({
    err: 1,
    msg: error.message
  });
};
exports.badRequest = badRequest;
var internalServerError = function internalServerError(res) {
  var error = _httpErrors["default"].InternalServerError();
  return res.status(error.status).json({
    err: 1,
    msg: error.message
  });
};
exports.internalServerError = internalServerError;
var notFound = function notFound(req, res) {
  var error = _httpErrors["default"].NotFound("Not Found");
  return res.status(error.status).json({
    err: 1,
    msg: error.message
  });
};
exports.notFound = notFound;
var notAuth = function notAuth(err, res) {
  var error = _httpErrors["default"].Unauthorized(err);
  return res.status(error.status).json({
    err: 1,
    msg: error.message
  });
};
exports.notAuth = notAuth;