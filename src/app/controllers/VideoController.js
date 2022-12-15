import Video from "../models/Video";
import { url, notes } from "../../helpers/joi_schema";
import joi from "joi";
const cloudinary = require("cloudinary").v2;
import { badRequest } from "../../middlewares/handleError";
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
    const fileData = req.file;
    console.log(fileData);
    const { error } = joi
      .object({ url, notes })
      .validate({ ...formData, url: fileData?.path });

    if (error) {
      if (fileData) {
        cloudinary.uploader.destroy(fileData.filename);
        console.log(fileData.filename);
      }
      return badRequest(error.details[0]?.message, res);
    }
    const video = new Video({ ...formData, url: fileData?.path });
    video
      .save()
      .then((video) =>
        res.json({
          err: video ? 0 : 1,
          mes: video ? "Created" : "Can not create",
        })
      )
      .catch(() => internalServerError(res));
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
