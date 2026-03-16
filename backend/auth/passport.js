const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true, // Needed to access req for manual redirect
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = await new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              profileImage: profile.photos[0].value,
            }).save();
          }

          // Generate JWT token
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

          // 🚀 Redirect manually with token in URL
          req.res.redirect(`http://localhost:5173/dashboard?token=${token}`);
        } catch (err) {
          console.error("Google login error:", err);
          req.res.redirect("http://localhost:5173/login");
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
