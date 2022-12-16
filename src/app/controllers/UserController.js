import User from "../models/User";
import { internalServerError } from "../../middlewares/handleError";
import joi from "joi";

import { url } from "../../helpers/joi_schema";
class UserController {
  findAll(req, res, next) {
    User.find({})
      .then((users) => res.json(users))
      .catch(() => res.json("err"));
  }
  findOne(req, res, next) {
    const { id } = req.user;
    User.findById(id)
      .select({ password: false })
      .then((user) =>
        res.status(200).json({
          err: user ? 0 : 1,
          mes: user ? "Got" : "User not found",
          userData: user,
        })
      )
      .catch(() => internalServerError(res));
  }
  create(req, res, next) {
    const formData = req.body;
    console.log(formData);
    // handle to cloudinary
    const user = new User(formData);
    user
      .save()
      .then(() => res.json("success"))
      .catch(() => res.json("err"));
  }
  update(req, res, next) {
    const id = req.params.id;
    console.log(id);
    const formData = req.body;
    console.log(formData);
    User.findByIdAndUpdate(id, formData)
      .then(() => res.json("success"))
      .catch(() => res.json("err"));
  }
  delete(req, res, next) {
    const id = req.params.id;
    User.findByIdAndDelete(id)
      .then(() => res.json("success"))
      .catch(() => res.json("err"));
  }
  uploadAvatar(req, res, next) {
    const fileData = req.file;
    console.log(fileData);
    const { error } = joi.object({ url }).validate({ url: fileData?.path });
    if (error) {
      if (fileData) {
        cloudinary.uploader.destroy(fileData.filename);
        console.log(fileData.filename);
      }
      return badRequest(error.details[0]?.message, res);
    }
    return res.status(200).json({ avatar: fileData?.path });
  }
}

module.exports = new UserController();
