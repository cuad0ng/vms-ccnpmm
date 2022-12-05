import { register, login } from "../services/AuthService";
import { internalServerError } from "../../middlewares/handleError";

class AuthController {
  async register(req, res) {
    try {
      const { email, password, ...rest } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          err: 1,
          mes: "Missing payloads",
        });
      }
      const response = await register(req.body);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          err: 1,
          mes: "Missing payloads",
        });
      }
      const response = await login(req.body);

      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  }
}

module.exports = new AuthController();
