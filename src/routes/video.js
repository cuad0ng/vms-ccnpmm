const express = require("express");
const router = express.Router();

const videoController = require("../app/controllers/VideoController");
const { uploadVideo } = require("../middlewares/cloudinary");
import verifyToken from "../middlewares/verifyToken";

router.get("/", videoController.findAll);

router.use(verifyToken);
router.get("/get-videos", videoController.getVideosByUserId);
router.get("/:id", videoController.findOne);
router.post("/", uploadVideo.single("video"), videoController.create);
router.put("/:id", videoController.update);
router.delete("/:id", videoController.delete);

module.exports = router;
