"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _multer = _interopRequireDefault(require("multer"));
var _routes = _interopRequireDefault(require("./routes"));
var _db = _interopRequireDefault(require("./config/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var port = process.env.PORT || 3000;
var app = (0, _express["default"])();
var form_data = (0, _multer["default"])();
_dotenv["default"].config();
_db["default"].connect();
app.use((0, _cors["default"])({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
// app.use(form_data.fields()); 

(0, _routes["default"])(app);
var listener = app.listen(port, function () {
  return console.log("Listening on ".concat(listener.address().port));
});