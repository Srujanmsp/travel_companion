const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  tripTitle: String,
  tripDates: String,
  startDate: String,
  endDate: String,
  notes: String,
  placesToVisit: [String],
  itinerary: [
    {
      day: Number,
      activities: [String],
    },
  ],
  budget: {
    transport: Number,
    accommodation: Number,
    food: Number,
    misc: Number,
  },
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  profileImage: String,
  trips: [TripSchema],
});

module.exports = mongoose.model("User", UserSchema);
