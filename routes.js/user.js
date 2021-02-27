const userController = require("../controllers").userController;
const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/token", verifyJWT(), userController.tokenCheck);

module.exports = router;
