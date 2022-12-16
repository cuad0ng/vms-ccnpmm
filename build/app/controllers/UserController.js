"use strict";

var _User = _interopRequireDefault(require("../models/User"));
var _handleError = require("../../middlewares/handleError");
var _joi = _interopRequireDefault(require("joi"));
var _joi_schema = require("../../helpers/joi_schema");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var UserController = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }
  _createClass(UserController, [{
    key: "findAll",
    value: function findAll(req, res, next) {
      _User["default"].find({}).then(function (users) {
        return res.json(users);
      })["catch"](function () {
        return res.json("err");
      });
    }
  }, {
    key: "findOne",
    value: function findOne(req, res, next) {
      var id = req.user.id;
      _User["default"].findById(id).select({
        password: false
      }).then(function (user) {
        return res.status(200).json({
          err: user ? 0 : 1,
          mes: user ? "Got" : "User not found",
          userData: user
        });
      })["catch"](function () {
        return (0, _handleError.internalServerError)(res);
      });
    }
  }, {
    key: "create",
    value: function create(req, res, next) {
      var formData = req.body;
      console.log(formData);
      // handle to cloudinary
      var user = new _User["default"](formData);
      user.save().then(function () {
        return res.json("success");
      })["catch"](function () {
        return res.json("err");
      });
    }
  }, {
    key: "update",
    value: function update(req, res, next) {
      var id = req.params.id;
      var formData = req.body;
      _User["default"].findByIdAndUpdate(id, formData).then(function () {
        return res.json("success");
      })["catch"](function () {
        return res.json("err");
      });
    }
  }, {
    key: "delete",
    value: function _delete(req, res, next) {
      var id = req.params.id;
      _User["default"].findByIdAndDelete(id).then(function () {
        return res.json("success");
      })["catch"](function () {
        return res.json("err");
      });
    }
  }, {
    key: "uploadAvatar",
    value: function uploadAvatar(req, res, next) {
      var fileData = req.file;
      console.log(fileData);
      var _joi$object$validate = _joi["default"].object({
          url: _joi_schema.url
        }).validate({
          url: fileData === null || fileData === void 0 ? void 0 : fileData.path
        }),
        error = _joi$object$validate.error;
      if (error) {
        var _error$details$;
        if (fileData) {
          cloudinary.uploader.destroy(fileData.filename);
          console.log(fileData.filename);
        }
        return badRequest((_error$details$ = error.details[0]) === null || _error$details$ === void 0 ? void 0 : _error$details$.message, res);
      }
      return res.status(200).json({
        avatar: fileData === null || fileData === void 0 ? void 0 : fileData.path
      });
    }
  }]);
  return UserController;
}();
module.exports = new UserController();