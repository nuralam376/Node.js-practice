const router = require("express").Router();
const passport = require("passport");
const connection = require("../config/database");
const User = connection.models.User;
const passwordUtils = require("../lib/passwordUtils");

require("../config/passport");

router.get(
  "/protected-route",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    return res.json({ success: true, message: " You are authenticated" });
  }
);

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.json({ success: false, message: "No user found" });
    }

    const isValid = passwordUtils.validPassword(
      req.body.password,
      user.hash,
      user.salt
    );

    if (isValid) {
      const jwt = passwordUtils.issueJwt(user);
      delete user.password;
      return res.json({ success: true, user: user, token: jwt.token });
    }
    return res.json({ success: false, message: "Wrong Password" });
  });
});

// TODO
router.post("/register", (req, res, next) => {
  const saltHash = passwordUtils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newuser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
  });

  newuser
    .save()
    .then((user) => {
      const jwt = passwordUtils.issueJwt(user);

      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expiresIn,
      });
    })
    .catch((err) => next(err));
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/protected-route");
});

module.exports = router;
