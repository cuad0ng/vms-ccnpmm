const Image = require("../models/Image");
import { url, userId } from "../../helpers/joi_schema";
import joi from "joi";
const cloudinary = require("cloudinary").v2;

import { badRequest } from "../../middlewares/handleError";
class ImageController {
  findAll(req, res, next) {
    Image.find({})
      .then((data) => res.json(data))
      .catch(() => res.json("err"));
  }
  findOne(req, res, next) {
    const paramId = req.params.id;
    const { id } = req.user;
    Image.findById(paramId)
      .then((data) => {
        if (id === data.userId) {
          res.json(data);
        } else {
          res.json("Unauthen");
        }
      })
      .catch(() => res.json("err"));
  }
  create(req, res, next) {
    const { id } = req.user;
    const formData = req.body;
    const fileData = req.file;
    const { error } = joi
      .object({ url, userId })
      .validate({ url: fileData?.path, userId: id });
    if (error) {
      if (fileData) {
        cloudinary.uploader.destroy(fileData.filename);
        console.log(fileData.filename);
      }
      return badRequest(error.details[0]?.message, res);
    }
    const image = new Image({ url: fileData?.path, userId: id });
    image
      .save()
      .then(() => res.json("success"))
      .catch(() => res.json("err"));
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
  getImagesByUserId(req, res, next) {
    const { id } = req.user;
    Image.find({ userId: id }).then((user) =>
      res.status(200).json({
        err: user ? 0 : 1,
        mes: user ? "Got" : "Images not found",
        image: user,
      })
    );
  }
}

module.exports = new ImageController();
