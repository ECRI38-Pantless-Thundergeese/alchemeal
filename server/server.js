const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const foodController = require('./controllers/foodController');
const userController = require('./controllers/userController');
const cookieController = require("./controllers/cookieController");

// Enable CORS for all origins, parse JSON payloads, parse cookies
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser())

// Deliver static files
app.use(express.static(path.resolve(__dirname, "../client")));

// Route to fetch results for selected illness
app.post(
  "/search",
  foodController.getFoods,
  foodController.getFacts,
  (req, res) => {
    return res.status(200).send(res.locals.facts)
  });

// Route to create new user
app.post("/signup", 
  userController.createUser,
  cookieController.setSessionCookie,
  (req, res) => {
    const { username } = res.locals.user;
    return res.status(200).json(username);
  });

// Route to log user in
app.post("/login", 
  userController.verifyUser,
  cookieController.setSessionCookie,
  (req, res) => {
    const { username } = res.locals.user;
    return res.status(200).json(username);
  });

// Route to verify authentication
app.get("/verify", 
  cookieController.verifySessionCookie,
  (req, res) => {
    const { username } = res.locals.user;
    return res.status(200).json(username);
  });

// Route to logout
app.delete("/logout",
  cookieController.removeSessionCookie,
  (req, res) => {
    return res.sendStatus(200);
  });

// Route to fetch user preferences
app.get('/preferences/:username', 
  userController.updatePreferences, 
  (req, res) => {
    res.status(200).json(res.locals.favorite);
  });

// Route to update user preferences
app.patch('/preferences/:username', 
  userController.updatePreferences, // update to controller name
  (req, res) => { 
    res.status(200).json(res.locals.preferences); // update to correct res.locals storage
  });

// REMOVE?
// // Route to delete a favorite food from a user's favorite collection
// app.patch('/user/deletefav/:username',
//   userController.deleteFavorite,
//   (req, res) => {
//     res.status(200).json(res.locals.favorite);
//   });

// Catch all route
app.use('/', (req, res) => {
  return res.status(404).json({err: "Not found."})
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error.",
    status: 500,
    message: { err: "An unknown error occurred." },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
