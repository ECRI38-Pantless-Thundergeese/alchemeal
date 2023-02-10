const express = require('express');
const router = express.Router();

const oauthController = require('../controllers/oauthController');
const cookieController = require('../controllers/cookieController');

// Redirect to Google login
router.get(
  '/google/redirect',
  oauthController.generateGoogleURL,
  (req, res) => {
    redirect = res.locals.redirect;
    return res.status(200).json({ redirect });
  }
);

// Authenticate Google user
router.get(
  '/google',
  oauthController.getGoogleUser,
  oauthController.authenticateGoogleUser,
  cookieController.setSessionCookie,
  (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      return res.status(302).redirect('/');
    }

    return res
      .status(302)
      .redirect(`http://localhost:${process.env.REACT_DEV_PORT}`);
  }
);

module.exports = router;
