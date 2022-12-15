"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Video = new Schema({
  notes: String,
  url: String,
  folder: String
}, {
  timestamps: true
});
module.exports = mongoose.model("Video", Video);