const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

dotenv.config();

require("./auth/passport")(passport);

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const planRoutes = require("./routes/plan");
const geocodeRoutes = require("./routes/geocode");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Mount routes under consistent '/api' prefix
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/geocode", geocodeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
