const User = require('../models/userModel');
const allergyController = {};

  // IT *MUST* RECIEVE AN ARRAY AS THE VALUE OF FAVORIES
  allergyController.addAllergy = async (req, res, next) => {
    console.log('inside the add allergy');
    const { username } = req.params;
    const { allergy } = req.body;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw Error('user not found');
      }
      
      allergy.forEach((fav) => {
        if (!user.allergy.includes(fav)) {
          user.allergy.push(fav);
        }
      });
      await user.save();
      res.locals.allergy = user.allergy; // sends updated allergy array
      console.log(res.locals.allergy)
      return next();
    } catch (error) {
      return next({
        log: 'Error in userController.addallergy middleware function',
        status: 500,
        message: { err: error.message },
      });
    }
  };
  
    // IT *MUST* RECIEVE AN ARRAY AS THE VALUE OF FAVORIES
  allergyController.deleteAllergy = async (req, res, next) => {
    console.log('inside the delete favorite');
    const { username } = req.params;
    const deleteAllergy  = req.body.allergy;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw Error('user not found');
      }
      for (let i = deleteAllergy.length - 1; i > -1; i--){
        user.allergy = user.allergy.filter(al => al !== deleteAllergy[i] );
      }
  
      await user.save();
      res.locals.allergy = user.allergy; // sends back updated allergy array
      return next();
    } catch (error) {
      return next({
        log: 'Error in userController.deleteallergy middleware function',
        status: 500,
        message: { err: error.message },
      });
    }
  };

  allergyController.getAllergy = async (req, res, next) => {}

module.exports = allergyController;