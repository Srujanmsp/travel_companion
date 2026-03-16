// models/Trip.js
const mongoose = require("mongoose");

const StopSchema = new mongoose.Schema({
  id: { type: String, required: true }, // frontend's generated ID for DnD
  address: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tripTitle: { type: String, required: true },
    tripDates: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    notes: { type: String },
    placesToVisit: [{ type: String }],
    itinerary: { type: Array, default: [] },
    budget: {
      transport: { type: Number, default: 0 },
      accommodation: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      misc: { type: Number, default: 0 },
    },
    expenses: [
      {
        category: String,
        amount: Number,
        description: String,
      },
    ],
    travelers: { type: Number, default: 1 },

    // ✅ New stops field to store AddStops locations
    stops: { type: [StopSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
