var express = require("express");
var router = express.Router();
const passport = require("passport");

const {
  allowPost,
  blockUser,
  unblockUser,
} = require("../controllers/adminController");

router.put(
  "/post/allow/:id",
  passport.authenticate("jwt", { session: false }),
  allowPost
);
router.put(
  "/user/block/:id",
  passport.authenticate("jwt", { session: false }),
  blockUser
);
router.put(
  "/user/unblock/:id",
  passport.authenticate("jwt", { session: false }),
  unblockUser
);

module.exports = router;
