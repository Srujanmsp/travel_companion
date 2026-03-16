// routes/geocode.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const address = req.query.address;
  const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;

  if (!address) return res.status(400).json({ error: "Address is required." });
  if (!apiKey) return res.status(500).json({ error: "Google Maps API key not set." });

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const result = await axios.get(url);
    if (result.data.status === "OK") {
      const { lat, lng } = result.data.results[0].geometry.location;
      return res.json({ lat, lng, address: result.data.results[0].formatted_address });
    } else {
      return res.status(422).json({ error: `Geocoding failed: ${result.data.status}`, details: result.data.error_message });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error during geocoding.", details: err.message });
  }
});

module.exports = router;
