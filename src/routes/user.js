import express from "express";

import userController from "../app/controllers/UserController";

const router = express.Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
