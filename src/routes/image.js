const express = require("express");
const router = express.Router();

const imageController = require("../app/controllers/ImageController");
const uploadCloud = require("../middlewares/cloudinary");

router.get("/", imageController.findAll);
router.get("/:id", imageController.findOne);
router.post("/", uploadCloud.single("image"), imageController.create);
router.put("/:id", imageController.update);
router.delete("/:id", imageController.delete);

module.exports = router;
