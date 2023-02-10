const User = require('../models/userModel');
const allergyController = {};

  // Accepts an array of selections and adds them to the users allergy property
  allergyController.addAllergy = async (req, res, next) => {
    // IT *MUST* RECIEVE AN ARRAY AS THE VALUE OF ALLERGY
    console.log('inside the add allergy');
    const { username } = req.params;
    const { allergy } = req.body;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw Error('user not found');
      }
      
      allergy.forEach((a) => {
        if (!user.allergy.includes(a)) {
          user.allergy.push(a);
        }
      });
      await user.save();
      res.locals.allergy = user.allergy; // sends updated allergy array
      console.log(res.locals.allergy)
      return next();
    } catch (error) {
      return next({
        log: 'Error in allergyController.addallergy middleware function',
        status: 500,
        message: { err: error.message },
      });
    }
  };
  
  // Accepts an array of selections and removes them from the users allergy property
  allergyController.deleteAllergy = async (req, res, next) => {
    // IT *MUST* RECIEVE AN ARRAY AS THE VALUE OF ALLERGY
    console.log('inside the delete allergy');
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
        log: 'Error in allergyController.deleteallergy middleware function',
        status: 500,
        message: { err: error.message },
      });
    }
  };

  // returns current allergies
  allergyController.getAllergy = async (req, res, next) => {
      console.log('inside the get allergy');
      const { username } = req.params;
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          throw Error('user not found');
        }
        res.locals.allergy = user.allergy; // sends back updated allergy array
        return next();
      } catch (error) {
        return next({
          log: 'Error in allergyController.getallergy middleware function',
          status: 500,
          message: { err: error.message },
        });
      }
  };
  
  

module.exports = allergyController;