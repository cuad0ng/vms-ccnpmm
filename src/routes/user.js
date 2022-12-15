import express from "express";

import userController from "../app/controllers/UserController";
import verifyToken from "../middlewares/verifyToken";
import isAdmin from "../middlewares/verifyRole";
const router = express.Router();

//PUBLIC
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

// PRIVATE
router.use(verifyToken);
router.get("/", userController.findOne);

module.exports = router;
