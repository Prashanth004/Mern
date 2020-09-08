var express = require("express");
var router = express.Router();
const passport = require("passport");
var path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    let parts = file.originalname.split(".");
    let ext = parts.pop();
    let name = parts.join(".");
    parts = name.split(" ").join(".");
    cb(null, +Date.now() + "." + ext);
  },
});
const upload = multer({ storage: storage });

const {
  addPost,
  deletePost,
  getAllPosts,
  getPostBYId,
  getMyPosts,
  deleteAllPost,
} = require("../controllers/postController");

router.post(
  "/",
  upload.single("postImage"),
  passport.authenticate("jwt", { session: false }),
  addPost
);
router.delete(
  "/all",
  passport.authenticate("jwt", { session: false }),
  deleteAllPost
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

router.get(
  "/all",

  getAllPosts
);

router.get("/my", passport.authenticate("jwt", { session: false }), getMyPosts);

router.get(
  "/id/:id",

  getPostBYId
);

module.exports = router;
