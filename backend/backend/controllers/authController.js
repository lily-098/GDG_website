const jwt = require("jsonwebtoken");


exports.oauthCallback = async (req, res) => {
    const generateToken = (userId) => {
  const JWT_SECRET="ilovenobody"
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};
  try {
    const user = req.user; // Passport attaches user to the req object
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
