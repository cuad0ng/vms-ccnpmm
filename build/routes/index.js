"use strict";

var _handleError = require("../middlewares/handleError");
var _user = _interopRequireDefault(require("./user"));
var _video = _interopRequireDefault(require("./video"));
var _image = _interopRequireDefault(require("./image"));
var _auth = _interopRequireDefault(require("./auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var swaggerUi = require("swagger-ui-express");
var swaggerDocs = require("../config/swagger.json");
function route(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use("/api/v1/user", _user["default"]);
  app.use("/api/v1/video", _video["default"]);
  app.use("/api/v1/image", _image["default"]);
  app.use("/api/v1/auth", _auth["default"]);
  app.use(_handleError.notFound);
}
module.exports = route;