const express = require("express");
const post = require("./post");
const user = require("./user");
const chat = require("./chat");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("API PAGE ...");
});

router.use("/post", post);
router.use("/user", user);
router.use("/chat", chat);

module.exports = router;
