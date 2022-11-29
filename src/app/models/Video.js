const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Video = new Schema(
  {
    notes: String,
    url: String,
    folder: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", Video);
