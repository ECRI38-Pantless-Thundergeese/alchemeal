const User = require('../models/userModel');

const favoriteController = {};
 
  // IT *MUST* RECIEVE AN ARRAY AS THE VALUE OF FAVORIES
  favoriteController.addFavorite = async (req, res, next) => {
    console.log('inside the add favorite');
    const { username } = req.params;
    const { favorite } = req.body;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw Error('user not found');
      }
      
      favorite.forEach((fav) => {
        if (!user.favorite.includes(fav)) {
          user.favorite.push(fav);
        }
      });
      await user.save();
      res.locals.favorite = user.favorite; // sends updated favorites array
      console.log(res.locals.favorite)
      return next();
    } catch (error) {
      return next({
        log: 'Error in userController.addFavorite middleware function',
        status: 500,
        message: { err: error.message },
      });
    }
  };
  
    // IT *MUST* RECIEVE AN ARRAY AS THE VALUE OF FAVORIES
  favoriteController.deleteFavorite = async (req, res, next) => {
    console.log('inside the delete favorite');
    const { username } = req.params;
    const deleteFavorite  = req.body.favorite;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw Error('user not found');
      }
      for (let i = deleteFavorite.length - 1; i > -1; i--){
        user.favorite = user.favorite.filter(fav => fav !== deleteFavorite[i] );
      }
  
      await user.save();
      res.locals.favorite = user.favorite; // sends back updated favorites array
      return next();
    } catch (error) {
      return next({
        log: 'Error in userController.deleteFavorite middleware function',
        status: 500,
        message: { err: error.message },
      });
    }
  };

  favoriteController.getFavorite = async (req, res, next) => {}
  
  module.exports = favoriteController;
