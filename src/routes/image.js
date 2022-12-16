const express = require("express");
const router = express.Router();

const imageController = require("../app/controllers/ImageController");
const {uploadImage} = require("../middlewares/cloudinary");
import verifyToken from "../middlewares/verifyToken";




router.use(verifyToken);
router.get("/get-images", imageController.getImagesByUserId);
router.get("/:id", imageController.findOne);
router.get("/", imageController.findAll);
router.post("/", uploadImage.single("image"), imageController.create);
router.put("/:id", imageController.update);
router.delete("/:id", imageController.delete);

module.exports = router;
