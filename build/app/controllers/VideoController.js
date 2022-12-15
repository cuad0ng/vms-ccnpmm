"use strict";

var _Video = _interopRequireDefault(require("../models/Video"));
var _joi_schema = require("../../helpers/joi_schema");
var _joi = _interopRequireDefault(require("joi"));
var _handleError = require("../../middlewares/handleError");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var cloudinary = require("cloudinary").v2;
var VideoController = /*#__PURE__*/function () {
  function VideoController() {
    _classCallCheck(this, VideoController);
  }
  _createClass(VideoController, [{
    key: "findAll",
    value: function findAll(req, res, next) {
      _Video["default"].find({}).then(function (data) {
        return res.json(data);
      })["catch"](function () {
        return res.json("err");
      });
    }
  }, {
    key: "findOne",
    value: function findOne(req, res, next) {
      var id = req.params.id;
      _Video["default"].findById(id).then(function (data) {
        return res.json(data);
      })["catch"](function () {
        return res.json("err");
      });
    }
  }, {
    key: "create",
    value: function create(req, res, next) {
      var formData = req.body;
      var fileData = req.file;
      console.log(fileData);
      var _joi$object$validate = _joi["default"].object({
          url: _joi_schema.url,
          notes: _joi_schema.notes
        }).validate(_objectSpread(_objectSpread({}, formData), {}, {
          url: fileData === null || fileData === void 0 ? void 0 : fileData.path
        })),
        error = _joi$object$validate.error;
      if (error) {
        var _error$details$;
        if (fileData) {
          cloudinary.uploader.destroy(fileData.filename);
          console.log(fileData.filename);
        }
        return (0, _handleError.badRequest)((_error$details$ = error.details[0]) === null || _error$details$ === void 0 ? void 0 : _error$details$.message, res);
      }
      var video = new _Video["default"](_objectSpread(_objectSpread({}, formData), {}, {
        url: fileData === null || fileData === void 0 ? void 0 : fileData.path
      }));
      video.save().then(function (video) {
        return res.json({
          err: video ? 0 : 1,
          mes: video ? "Created" : "Can not create"
        });
      })["catch"](function () {
        return internalServerError(res);
      });
    }
  }, {
    key: "update",
    value: function update(req, res, next) {
      var id = req.params.id;
      var formData = req.body;
      _Video["default"].findByIdAndUpdate(id, formData).then(function () {
        return res.json("success");
      })["catch"](function () {
        return res.json("err");
      });
    }
  }, {
    key: "delete",
    value: function _delete(req, res, next) {
      var id = req.params.id;
      _Video["default"].findByIdAndDelete(id, formData).then(function () {
        return res.json("success");
      })["catch"](function () {
        return res.json("err");
      });
    }
  }]);
  return VideoController;
}();
module.exports = new VideoController();