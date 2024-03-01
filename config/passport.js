const db = require('../models');
const User = db.users;
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const GitHubStrategy = require('passport-github').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser((user, done) => {
  // Serialize the necessary information about the user
  const serializedUser = { id: user.id, email: user.email };
  done(null, serializedUser);
});

passport.deserializeUser(async (serializedUser, done) => {
  try {
    // Fetch the complete user object using the serialized data
    const user = await User.findByPk(serializedUser.id);

    // Set additional properties in user object
    user.email = serializedUser.email;

    done(null, user);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

// Generate a random 4-character string
function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:5001/google/callback',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let username;
        if (profile && profile.name && profile.name.givenName) {
          username = profile.name.givenName;
        } else {
          // If givenName is not available, generate a random username
          username = generateRandomUsername();
          console.log('username :', username);
        }

        // Check if the username is already taken
        let user = await User.findOne({ where: { username } });

        if (user) {
          // Append a random string to the username to make it unique
          username += generateRandomString();
        }

        // Check if a user with the same email already exists
        user = await User.findOne({ where: { email: profile.emails[0].value } });

        if (user) {
          // Update the existing user account with the new authentication provider details
          user.googleId = profile.id;
          await user.save();
        } else {
          // Create a new user account
          user = await User.create({
            id: uuidv4(),
            googleId: profile.id,
            email: profile.emails[0].value,
            username,
          });
        }

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
