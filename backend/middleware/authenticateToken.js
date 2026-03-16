// middleware/authenticateToken.js
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  console.log("🔐 Raw Authorization Header:", req.headers["authorization"]);
  
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

  console.log("🔐 Received token:", token); // ✅ Log token


  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification failed:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log("👤 Decoded user:", user); // ✅ Log decoded user

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
