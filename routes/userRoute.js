var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require("../model/user");

const { login, signup } = require("../controllers/userController");

router.post("/login", login);
router.post("/signup", signup);
router.get(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      res.status(200).send({
        result: 1,
        message: "logged in",
        payload: { user },
      });
    } catch (error) {
      console.log("error : ", error);
      res.status(500).send({
        result: 0,
        message: "Something went wrong",
        payload: error,
      });
    }
  }
);

module.exports = router;
