import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const register = (user) =>
  new Promise(async (resolve, reject) => {
    try {
      const { email, password, ...rest } = user;
      let token = null;
      const response = await User.findOne({ email: email });
      if (!response) {
        rest.email = email;
        rest.password = hashPassword(password);
        const user = new User(rest);
        user
          .save()
          .then(() => console.log("success"))
          .catch();
        token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "5d" }
        );
      }
      resolve({
        err: !response ? 0 : 1,
        msg: !response ? "Register Success" : "Email is exists",
        access_token: token ? `Bearer ${token}` : token,
      });
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await User.findOne({ email: email });
      const isChecked =
        response && bcrypt.compareSync(password, response.password);
      const token = isChecked
        ? jwt.sign(
            { id: response.id, email: response.email, role: response.role },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        err: token ? 0 : 1,
        msg: token
          ? "Login Success"
          : response
          ? "Wrong Password"
          : "Not exist email or has been used",
        access_token: token,
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
