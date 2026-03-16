const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateToken = require("../middleware/authenticateToken");
const Trip = require("../models/Trip"); // <-- Import Trip model

const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashed });
    await user.save();

    console.log("✅ Registered user:", user.email);
    res.json({ msg: "Registered successfully" });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).send("Server error");
  }
});

// ✅ Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).send("Server error");
  }
});

// ✅ Get current user info (after token login / Google redirect)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("❌ /me route error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update Profile
router.put("/update", authenticateToken, async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "User not found" });

    res.json({
      success: true,
      user: {
        id: updated._id,
        name: updated.name,
        email: updated.email,
      },
    });
  } catch (err) {
    console.error("❌ Update profile error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all trips for the logged-in user from Trip collection
router.get("/mytrips", authenticateToken, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    console.error("❌ Fetch mytrips error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---- Legacy embedded trip endpoints, NO LONGER USED ---- */

// // ✅ Save Trip (legacy support)
// router.post("/saveTrip/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.trips.push(req.body);
//     await user.save();

//     res.json({ trips: user.trips });
//   } catch (err) {
//     console.error("❌ Save trip error:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ Get all trips of a user (legacy support)
// router.get("/trips/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json(user.trips);
//   } catch (err) {
//     console.error("❌ Fetch trips error:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
