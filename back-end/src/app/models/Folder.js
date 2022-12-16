const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Folder = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Folder", Folder);
