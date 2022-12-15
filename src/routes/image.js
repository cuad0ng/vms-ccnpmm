const express = require("express");
const router = express.Router();

const imageController = require("../app/controllers/ImageController");
const {uploadImage} = require("../middlewares/cloudinary");
import verifyToken from "../middlewares/verifyToken";


router.get("/", imageController.findAll);
router.get("/:id", imageController.findOne);

router.use(verifyToken);
router.post("/", uploadImage.single("image"), imageController.create);
router.put("/:id", imageController.update);
router.delete("/:id", imageController.delete);

module.exports = router;
