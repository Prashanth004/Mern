const User = require("../model/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("config");

const createToken = async (user, body) => {
  var token = jwt.sign({ user: body }, config.get("JWT_SECRET"), {
    expiresIn: config.get("JWT_EXPIRY"),
    issuer: config.get("JWT_ISSUER"),
    audience: config.get("JWT_AUDIENCE"),
  });
  return token;
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      res.status(500).send({
        result: 0,
        payload: "username password did not match",
      });
    } else {
      const body = {
        _id: user._id,
        email: user.email,
      };
      const token = await createToken(user, body);
      res.status(200).send({
        result: 1,
        payload: token,
      });
    }
  } catch (error) {
    res.status(500).send({
      result: 0,
      message: "something went wrong",
      payload: error,
    });
  }
};
const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    console.log(email, password, firstName, lastName);
    let body;
    if (!email || !password || !firstName || !lastName)
      return res.status(500).send({
        result: 0,
        message: "Parameters missing",
        payload: {},
      });
    const user = await User.findOne({ email, password });
    if (user) {
      return res.status(500).send({
        result: 0,
        message: "User already registered",
        payload: {},
      });
    } else {
      var newPerson = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        blocked: false,
      });
      newPerson = await newPerson.save();
      body = {
        _id: newPerson._id,
        email: newPerson.email,
        blocked: newPerson.blocked,
      };
    }

    const token = await createToken(newPerson, body);
    return res.status(200).send({
      result: 1,
      payload: token,
    });
  } catch (error) {
    return res.status(500).send({
      result: 0,
      message: "something went wrong",
      payload: error,
    });
  }
};

module.exports = {
  login,
  signup,
};
