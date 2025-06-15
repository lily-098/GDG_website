const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/User");

// Serialize user into session (required by Passport)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session (required by Passport)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/api/auth/google/callback`, // Use BASE_URL to support multiple environments
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create new user if not found
          user = await User.create({
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            googleId: profile.id,
            profilePhoto: profile.photos?.[0]?.value,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/api/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          // Create new user if not found
          user = await User.create({
            name: profile.displayName || profile.username,
            email: profile.emails?.[0]?.value,
            githubId: profile.id,
            profilePhoto: profile.photos?.[0]?.value,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Twitter OAuth Strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/api/auth/twitter/callback`,
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        let user = await User.findOne({ twitterId: profile.id });

        if (!user) {
          // Create new user if not found
          user = await User.create({
            name: profile.displayName,
            email: profile.emails?.[0]?.value || null, // Handle missing email
            twitterId: profile.id,
            profilePhoto: profile.photos?.[0]?.value,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
