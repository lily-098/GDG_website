const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware.js");
const {createContact}=require("../controllers/CreateContact.js")
const { registerForEvent } = require("../controllers/RegisterEvent.js");
const router = express.Router();
const passport = require("passport");
const { oauthCallback } = require("../controllers/authController");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
 router.post('/contact',createContact);
 
const generateToken = (userId) => {
  const JWT_SECRET="ilovenobody"
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = generateJWT(req.user);
    // Send token as JSON or redirect as needed
    res.json({ token, user: req.user });
  }
);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = generateJWT(req.user);
    res.json({ token, user: req.user });
  }
);

// Twitter OAuth
router.get('/twitter', passport.authenticate('twitter'));
router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = generateJWT(req.user);
    res.json({ token, user: req.user });
  }
);

module.exports = router;
