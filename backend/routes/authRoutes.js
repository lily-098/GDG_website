const express = require("express");
const router = express.Router();
const passport = require("passport");
const { oauthCallback } = require("../controllers/authController");

// Google OAuth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate("google", { session: false }), oauthCallback);

// GitHub OAuth
router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/auth/github/callback", passport.authenticate("github", { session: false }), oauthCallback);

// Twitter OAuth
router.get("/auth/twitter", passport.authenticate("twitter"));
router.get("/auth/twitter/callback", passport.authenticate("twitter", { session: false }), oauthCallback);

module.exports = router;
