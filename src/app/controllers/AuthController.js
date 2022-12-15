import { register, login } from "../services/AuthService";
import { internalServerError, badRequest } from "../../middlewares/handleError";
import { email, password } from "../../helpers/joi_schema";
import joi from "joi";
class AuthController {
  async register(req, res) {
    try {
      const { error } = joi.object({ email, password }).validate(req.body);
      if (error) {
        return badRequest(error.details[0]?.message, res);
      }

      const response = await register(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
  async login(req, res) {
    try {
      const { error } = joi.object({ email, password }).validate(req.body);
      if (error) {
        return badRequest(error.details[0]?.message, res);
      }
      const response = await login(req.body);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

module.exports = new AuthController();
