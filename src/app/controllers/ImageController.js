const Image = require("../models/Image");

class ImageController {
  findAll(req, res, next) {
    Image.find({})
      .then((data) => res.json(data))
      .catch(() => res.json("err"));
  }
  findOne(req, res, next) {
    const id = req.params.id;
    Image.findById(id)
      .then((data) => res.json(data))
      .catch(() => res.json("err"));
  }
  create(req, res, next) {
    const formData = req.body;
    const image = new Image(formData);
    image
      .save()
      .then(() => res.json("success"))
      .catch(() => res.json("err"));
    res.json(req.file);
  }
  update(req, res, next) {
    const id = req.params.id;
    const formData = req.body;
    Image.findByIdAndUpdate(id, formData)
      .then(() => res.json("success"))
      .catch(() => res.json("err"));
  }
  delete(req, res, next) {
    const id = req.params.id;
    Image.findByIdAndDelete(id, formData)
      .then(() => res.json("success"))
      .catch(() => res.json("err"));
  }
}

module.exports = new ImageController();
