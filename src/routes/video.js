const express = require("express");
const router = express.Router();

const videoController = require("../app/controllers/VideoController");
const uploadCloud = require("../middlewares/cloudinary");

router.get("/", videoController.findAll);
router.get("/:id", videoController.findOne);
router.post("/", uploadCloud.single("video"), videoController.create);
router.put("/:id", videoController.update);
router.delete("/:id", videoController.delete);

module.exports = router;
