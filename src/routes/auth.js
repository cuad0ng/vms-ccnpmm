import express from "express";
const router = express.Router();

import authController from "../app/controllers/AuthController";

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
