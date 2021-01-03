const passport = require("passport");
const connection = require("./database");
const User = connection.models.User;

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwt-example",
  // algorithms: ["RS256"],
};

const strategy = new JwtStrategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub }).then((user) => {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

module.exports = (passport) => {
  passport.use(strategy);
};
