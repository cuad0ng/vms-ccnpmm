"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Folder = new Schema({
  name: String
}, {
  timestamps: true
});
module.exports = mongoose.model("Folder", Folder);