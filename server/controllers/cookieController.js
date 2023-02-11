const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const cookieController = {};

// Sets a session cookie with a JWT
cookieController.setSessionCookie = (req, res, next) => {
  const { _id, username } = res.locals.user;

  const sessionToken = jwt.sign({ _id, username }, secret);
  res.cookie('sessionToken', sessionToken, { httpOnly: true });

  return next();
};

// Verify JWT from session cookie
cookieController.verifySessionCookie = async (req, res, next) => {
  // Check if session token exists
  if (!Object.hasOwn(req.cookies, 'sessionToken')) {
    return next({
      log: `ERROR - cookieController.verifySessionCookie: Failed to extract cookie.`,
      status: 400,
      message: { err: 'User is not authenticated.' },
    });
  }

  // Decode token
  const { sessionToken } = req.cookies;
  jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next({
        log: `ERROR - cookieController.verifySessionCookie, failed to verify token: ${err}`,
        status: 400,
        message: { err: 'User is not authenticated.' },
      });
    } else {
      res.locals.user = decoded;
      return next();
    }
  });
};

// Clear JWT session cookie
cookieController.removeSessionCookie = (req, res, next) => {
  res.clearCookie('sessionToken');

  return next();
};

module.exports = cookieController;
