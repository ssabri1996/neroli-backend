const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

module.exports=passport.use(
    new BearerStrategy(async (token, done) => {
      const tokenData = await jwt.verify(token,"privateKey");
      console.log(tokenData);
      const user = await User.findOne({ _id: tokenData._id });
      if (!user) {
        return done(null, false);
      } else
      {
        return done(null, user);
      }
    })
  );