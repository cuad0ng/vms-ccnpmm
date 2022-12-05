import User from "../models/User";

class UserController {
  findAll(req, res, next) {
    User.find({})
      .then((users) => res.json(users))
      .catch(() => res.json("err"));
  }
  findOne(req, res, next) {
    const id = req.params.id;
    User.findById(id)
      .then((user) => res.json(user))
      .catch(() => res.json("err"));
  }
  create(req, res, next) {
    const formData = req.body;
    console.log(formData)
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
