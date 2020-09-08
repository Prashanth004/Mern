const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../model/user");
const config = require("config");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

var opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKeyProvider = secretOrKeyProvider;
opts.issuer = config.get("JWT_ISSUER");
opts.audience = config.get("JWT_AUDIENCE");

async function secretOrKeyProvider(request, rawJwtToken, done) {
  try {
    var decoded = await jwt.decode(rawJwtToken);
    if (decoded) {
      var db_user = await User.findOne({ _id: decoded.user._id });
      let pw = db_user.password;
      if (pw != null) {
        var secret = config.get("JWT_SECRET");
        return done(null, secret);
      } else throw new Error("Unauthorized1");
    } else throw new Error("Unauthorized3");
  } catch (error) {
    console.error("JWT authentication error = ", error);
    return done("Unauthorized");
  }
}

passport.use(
  new JWTstrategy(opts, async (token, done) => {
    try {
      //Pass the user details to the next middleware
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  })
);
