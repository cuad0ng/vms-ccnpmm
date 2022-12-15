import User from "../models/User";
import { internalServerError } from "../../middlewares/handleError";
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
    const formData = req.body;
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
}

module.exports = new UserController();
