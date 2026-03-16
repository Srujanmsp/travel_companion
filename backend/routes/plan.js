// routes/plan.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const Trip = require("../models/Trip");

// Save new trip (with stops)
router.post("/save", authenticateToken, async (req, res) => {
  try {
    const {
      tripTitle,
      tripDates,
      startDate,
      endDate,
      notes,
      placesToVisit,
      itinerary,
      budget,
      expenses,
      travelers,
      stops, // ✅ add stops from body
    } = req.body;

    const newTrip = new Trip({
      userId: req.user.id,
      tripTitle,
      tripDates,
      startDate,
      endDate,
      notes,
      placesToVisit,
      itinerary,
      budget,
      expenses,
      travelers,
      stops, // ✅ save stops to DB
    });

    await newTrip.save();
    res.status(200).json({ message: "Trip saved successfully!", tripId: newTrip._id });
  } catch (err) {
    console.error("Error saving trip:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get one trip by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all trips for a logged in user
router.get("/user/all", authenticateToken, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update an existing trip
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updated = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Trip not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
