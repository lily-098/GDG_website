const express = require("express");
const router = express.Router();
const passport = require("passport");
const { oauthCallback } = require("../controllers/authController");

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), oauthCallback);

// GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { session: false }), oauthCallback);

// Twitter OAuth
router.get("/twitter", passport.authenticate("twitter"));
router.get("/twitter/callback", passport.authenticate("twitter", { session: false }), oauthCallback);

module.exports = router;
