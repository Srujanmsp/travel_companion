const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

//  Redirect to Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

//  Handle Google callback and issue JWT
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //  Redirect to frontend with token
    res.redirect(`http://localhost:5173/oauth/callback?token=${token}`);
  }
);

module.exports = router;
