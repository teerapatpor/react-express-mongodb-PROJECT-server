const chatController = require("../controllers").chatController;
const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

router.post("/create", verifyJWT(), chatController.createChat);
router.post("/chat", chatController.chat);
router.post("/information", verifyJWT(), chatController.chatInfo);

module.exports = router;
