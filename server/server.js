// alchemealdb : const mongoURI = 'mongodb+srv://chanduh:alchemeal@solocluster.kybmlap.mongodb.net/?retryWrites=true&w=majority';
// original db : const mongoURI = 'mongodb+srv://goblinshark:codesmith@foodremedy.nl2qzoj.mongodb.net/?retryWrites=true&w=majority';

const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const profileRouter = require('./routes/profileRouter');
const oauthRouter = require('./routes/oauthRouter');

const foodController = require('./controllers/foodController');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');

// Enable CORS for all origins, parse JSON payloads, parse cookies
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Production static file delivery
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.get('/', (req, res) =>
    res
      .status(200)
      .sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
  );
}

// Route to create new user
app.post(
  '/signup',
  userController.createUser,
  cookieController.setSessionCookie,
  (req, res) => {
    const { username } = res.locals.user;
    return res.status(200).json(username);
  }
);

// Route to log user in
app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSessionCookie,
  (req, res) => {
    const { username } = res.locals.user;
    return res.status(200).json(username);
  }
);

// Route to verify authentication
app.get('/verify', cookieController.verifySessionCookie, (req, res) => {
  const { username } = res.locals.user;
  return res.status(200).json(username);
});

// Route to logout
app.delete('/logout', cookieController.removeSessionCookie, (req, res) => {
  return res.sendStatus(200);
});

// Route for OAuth authentication
app.use('/oauth', oauthRouter);

// Route to fetch results for selected illness for a user
app.post(
  '/search/:username',
  userController.getProfile,
  foodController.getFoods,
  foodController.getFacts,
  foodController.filterAllergy, 
  foodController.filterDiet,
  (req, res) => {
    console.log("you  made it babbeee, this shits filtered!")
    return res.status(200).send(res.locals.facts);
  }
);

// OLD Route to fetch results for selected illness (not user filtering)
app.post(
  '/search',
  foodController.getFoods,
  foodController.getFacts,
  (req, res) => {
    return res.status(200).send(res.locals.facts);
  }
);

// Route to profile endpoint
app.use('/profile', profileRouter);

// Catch all route
app.use('/*', (req, res) => {
  return res.status(404).send('404: Not found :(');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error.',
    status: 500,
    message: { err: 'An unknown error occurred.' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
