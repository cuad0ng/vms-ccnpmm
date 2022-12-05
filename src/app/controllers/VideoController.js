const Video = require("../models/Video");
const cloudinary = require("../../middlewares/cloudinary");
class VideoController {
  findAll(req, res, next) {
    Video.find({})
      .then((data) => res.json(data))
      .catch(() => res.json("err"));
  }
  findOne(req, res, next) {
    const id = req.params.id;
    Video.findById(id)
      .then((data) => res.json(data))
      .catch(() => res.json("err"));
  }
  create(req, res, next) {
    const formData = req.body;
    const file = req.file;
    console.log(file);
    const video = new Video(formData);
    video
      .save()
      .then(() => res.json("success"))
      .catch(() => res.json("err"));
  }
  update(req, res, next) {
    const id = req.params.id;
    const formData = req.body;
    Video.findByIdAndUpdate(id, formData)
      .then(() => res.json("success"))
      .catch(() => res.json("err"));
  }
  delete(req, res, next) {
    const id = req.params.id;
    Video.findByIdAndDelete(id, formData)
      .then(() => res.json("success"))
      .catch(() => res.json("err"));
  }
}

module.exports = new VideoController();
