const User = require('../models/userModel');
const dietController = {};

  // Accepts an array of selections and adds them to the users diet property
  dietController.addDiet = async (req, res, next) => {
     // IT *MUST* RECIEVE AN ARRAY AS THE VALUE OF DIET
     console.log('inside the add diet');
     const { username } = req.params;
     const { diet } = req.body;
     try {
       const user = await User.findOne({ username: username });
       if (!user) {
         throw Error('user not found');
       }
       
       diet.forEach((d) => {
         if (!user.diet.includes(d)) {
           user.diet.push(d);
         }
       });
       await user.save();
       res.locals.diet = user.diet; // sends updated allergy array
       console.log(res.locals.diet)
       return next();
     } catch (error) {
       return next({
         log: 'Error in dietController.addDiet middleware function',
         status: 500,
         message: { err: error.message },
       });
     }
  };

  // Accepts an array of selections and removes them to the users diet property
  dietController.deleteDiet = async (req, res, next) => {
    // IT *MUST* RECIEVE AN ARRAY AS THE VALUE OF DIET
    console.log('inside the delete diet');
    const { username } = req.params;
    const deleteDiet  = req.body.diet;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw Error('user not found');
      }
      for (let i = deleteDiet.length - 1; i > -1; i--){
        user.diet = user.diet.filter(d => d !== deleteDiet[i] );
      }
  
      await user.save();
      res.locals.diet = user.diet; // sends back updated diet array
      return next();
    } catch (error) {
      return next({
        log: 'Error in dietController.deleteDiet middleware function',
        status: 500,
        message: { err: error.message },
      });
    }
  };

  // returns current diets
  dietController.getDiet = async (req, res, next) => {
    console.log('inside the get diet');
      const { username } = req.params;
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          throw Error('user not found');
        }
        res.locals.diet = user.diet; // sends back updated diet array
        return next();
      } catch (error) {
        return next({
          log: 'Error in dietController.getdiet middleware function',
          status: 500,
          message: { err: error.message },
        });
      }
  }

module.exports = dietController;

