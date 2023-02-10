const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const User = require('../models/userModel');
const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
  'http://localhost:3000/oauth/google'
);

const oauthController = {};

oauthController.generateGoogleURL = (req, res, next) => {
  const redirect = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });

  res.locals.redirect = redirect;
  return next();
};

// Get Google user profile
oauthController.getGoogleUser = async (req, res, next) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);

    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    );

    const user = await response.json();
    res.locals.googleUser = user;
    return next();
  } catch (err) {
    next({
      log: `ERROR - oauthController.getGoogleUser: ${err}`,
      status: 400,
      message: {
        err: 'Failed to authenticate account. Check server log for details.',
      },
    });
  }
};

// Verify or create Googler user
oauthController.authenticateGoogleUser = async (req, res, next) => {
  const { id, email, given_name, family_name } = res.locals.googleUser;

  try {
    const userMatch = await User.findOne({ username: email });

    if (userMatch) {
      res.locals.user = userMatch;
      return next();
    } else {
      const newUser = await User.create({
        username: email,
        password: `Google OAuth: ${id}`,
        firstName: given_name,
        lastName: family_name,
      });
      res.locals.user = newUser;
      return next();
    }
  } catch (err) {
    next({
      log: `ERROR - oauthController.authenticateGoogleUser: ${err}`,
      status: 400,
      message: {
        err: 'Failed to authenticate account. Check server log for details.',
      },
    });
  }
};

module.exports = oauthController;
