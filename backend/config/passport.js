const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
require('dotenv').config();

// Serialize and deserialize user (adjust based on your user model)
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.API_BASE_URL}/auth/google/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
            // Perform user lookup or creation logic
            done(null, profile);
        }
    )
);

// GitHub Strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${process.env.API_BASE_URL}/auth/github/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
            // Perform user lookup or creation logic
            done(null, profile);
        }
    )
);

// Twitter Strategy
passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_API_KEY,
            consumerSecret: process.env.TWITTER_API_SECRET,
            callbackURL: `${process.env.API_BASE_URL}/auth/twitter/callback`,
        },
        (token, tokenSecret, profile, done) => {
            // Perform user lookup or creation logic
            done(null, profile);
        }
    )
);

module.exports = passport;
