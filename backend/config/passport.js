const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/User");

// Serialize user into session (not used for JWT-based apps but required by Passport)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session (not used for JWT-based apps but required by Passport)
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
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        // Create a new user if not found
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profilePhoto: profile.photos[0].value,
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
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        // Create a new user if not found
        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username,
            email: profile.emails[0].value,
            githubId: profile.id,
            profilePhoto: profile.photos[0]?.value,
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
      callbackURL: "/auth/twitter/callback",
      includeEmail: true, // Ensure email is included
    },
    async (token, tokenSecret, profile, done) => {
      try {
        let user = await User.findOne({ twitterId: profile.id });

        // Create a new user if not found
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails ? profile.emails[0]?.value : null, // Twitter may not always provide an email
            twitterId: profile.id,
            profilePhoto: profile.photos[0]?.value,
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
