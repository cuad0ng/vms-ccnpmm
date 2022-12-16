import express from "express";

import userController from "../app/controllers/UserController";
const {uploadImage} = require("../middlewares/cloudinary");
import verifyToken from "../middlewares/verifyToken";
import isAdmin from "../middlewares/verifyRole";
const router = express.Router();

//PUBLIC


// PRIVATE
router.use(verifyToken);
router.get("/", userController.findOne);
router.post("/", userController.create);
router.post("/upload-avatar", uploadImage.single("avatar"), userController.uploadAvatar);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
