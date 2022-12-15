"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Image = new Schema({
  notes: String,
  url: String,
  folder: String
}, {
  timestamps: true
});
module.exports = mongoose.model("Image", Image);