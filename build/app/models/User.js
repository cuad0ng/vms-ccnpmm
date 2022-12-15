"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = new Schema({
  email: String,
  password: String,
  role: {
    type: String,
    "default": 'US'
  },
  status: String,
  active: String,
  avatar: String,
  videos: [String],
  images: [String],
  name: String,
  birthDate: String,
  gender: String
}, {
  timestamps: true
});
module.exports = mongoose.model("User", User);