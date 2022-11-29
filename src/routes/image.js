const express = require("express");
const router = express.Router();

const imageController = require("../app/controllers/ImageController");

router.get("/", imageController.findAll);
router.get("/:id", imageController.findOne);
router.post("/", imageController.create);
router.put("/:id", imageController.update);
router.delete("/:id", imageController.delete);

module.exports = router;
