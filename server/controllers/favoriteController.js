const User = require('../models/userModel');

const favoriteController = {};

  // Accepts an array of selections and adds them to the users favorite property
  favoriteController.addFavorite = async (req, res, next) => {
    // IT *MUST* RECIEVE AN ARRAY AS THE VALUE OF FAVORITE
    console.log('inside the add favorite');
    const { username } = req.params;
    const { favorite } = req.body;
    console.log(username, favorite)
    try {
      const user = await User.findOne({ username: username });
      console.log(user)
      if (!user) {
        throw Error('user not found');
      }
      favorite.forEach((f) => {
        if (!user.favorite.includes(f)) {
          user.favorite.push(f);
        }
      });
      await user.save();
      res.locals.favorite = user.favorite; // sends updated favorite array
      console.log(res.locals.favorite)
      return next();
    } catch (error) {
      return next({
        log: 'Error in favoriteController.addFavorite middleware function',
        status: 500,
        message: { err: error.message },
      });
    }
  };
  
  // Accepts an array of selections and removes them from the users favorite property
  favoriteController.deleteFavorite = async (req, res, next) => {
    // IT *MUST* RECIEVE AN ARRAY AS THE VALUE OF FAVORITE
    console.log('inside the delete favorite');
    const { username } = req.params;
    const deleteFavorite  = req.body.favorite;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw Error('user not found');
      }
      for (let i = deleteFavorite.length - 1; i > -1; i--){
        user.favorite = user.favorite.filter(f => f !== deleteFavorite[i] );
      }
  
      await user.save();
      res.locals.favorite = user.favorite; // sends back updated favorites array
      return next();
    } catch (error) {
      return next({
        log: 'Error in favoriteController.deleteFavorite middleware function',
        status: 500,
        message: { err: error.message },
      });
    }
  };

  // Retrieves only the favorite from user 
  favoriteController.getFavorite = async (req, res, next) => {
      const { username } = req.params;
          try {
            const user = await User.findOne({ username });
            if (!user) {
              throw Error('user not found');
            }
        res.locals.favorite = user.favorite;
        return next();
        } 
        catch (error) {
          return next({
            log: 'Error in favoriteController.getFavorite middleware function',
            status: 500,
            message: { err: error.message },
          });
        }
  };

  
  module.exports = favoriteController;
