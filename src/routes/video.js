const express = require("express");
const router = express.Router();

const videoController = require("../app/controllers/VideoController");

router.get("/", videoController.findAll);
router.get("/:id", videoController.findOne);
router.post("/", videoController.create);
router.put("/:id", videoController.update);
router.delete("/:id", videoController.delete);

module.exports = router;
