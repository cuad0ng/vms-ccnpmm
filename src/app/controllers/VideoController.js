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
    const paramId = req.params.id;
    const { id } = req.user;
    Video.findById(paramId)
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
    const formData = req.body;
    const fileData = req.file;
    console.log(fileData)
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
  getVideosByUserId(req, res, next) {
    const { id } = req.user;
    Video.find({ userId: id }).then((user) =>
      res.status(200).json({
        err: user ? 0 : 1,
        mes: user ? "Got" : "Images not found",
        image: user,
      })
    );
  }
}

module.exports = new VideoController();
