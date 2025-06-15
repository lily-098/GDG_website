const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('./user.model');

// Configure each OAuth provider
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ 'oauth.google.id': profile.id });
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email: profile.emails?.[0]?.value,
            oauth: { google: { id: profile.id } }
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ 'oauth.github.id': profile.id });
        if (!user) {
          user = await User.create({
            username: profile.username,
            email: profile.emails?.[0]?.value,
            oauth: { github: { id: profile.id } }
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: '/auth/twitter/callback',
      includeEmail: true
    },
    async (token, tokenSecret, profile, done) => {
      try {
        let user = await User.findOne({ 'oauth.twitter.id': profile.id });
        if (!user) {
          user = await User.create({
            username: profile.username,
            email: profile.emails?.[0]?.value,
            oauth: { twitter: { id: profile.id } }
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Serialize/deserialize user for session support (if needed)
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

module.exports = passport;