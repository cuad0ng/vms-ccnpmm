"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = exports.password = exports.notes = exports.name = exports.email = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var email = _joi["default"].string().email({
  minDomainSegments: 2,
  tlds: {
    allow: ["com"]
  }
}).required();
exports.email = email;
var password = _joi["default"].string().min(6).required();
exports.password = password;
var url = _joi["default"].string().required();
exports.url = url;
var notes = _joi["default"].string().required();
exports.notes = notes;
var name = _joi["default"].string().required();
exports.name = name;