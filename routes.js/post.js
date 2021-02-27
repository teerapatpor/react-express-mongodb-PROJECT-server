const postController = require("../controllers").postController;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyJWT = require("../middlewares/verifyJWT");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post(
  "/create",
  upload.single("productImage"),
  postController.createForm
);
router.post("/delete", postController.deleteForm);
router.get("/get", , postController.getForm);
router.post("/like", verifyJWT(), postController.likeForm);
router.post("/unlike", verifyJWT(), postController.unlikeForm);

module.exports = router;
