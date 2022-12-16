"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _handleError = require("./handleError");
var isAdmin = function isAdmin(req, res, next) {
  var role = req.user.role;
  if (role !== "AD") return (0, _handleError.notAuth)("Require role Admin", res);
  next();
};
var _default = isAdmin;
exports["default"] = _default;