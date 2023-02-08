const Illness = require('../models/illnessModels');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const foodController = {};

// const accessPoint = 'https://api.edamam.com/api/nutrition-data';

// const app_id = 'c3e5b6ff';

// const app_key = 'b23cc3a2748cbdbbc9893ef62a4fffd0';

const preciseURL = 'https://api.edamam.com/api/nutrition-data?app_id=c3e5b6ff&app_key=b23cc3a2748cbdbbc9893ef62a4fffd0&nutrition-type=cooking&ingr=1%20ounce%20';

// gets
foodController.getFoods = (req, res, next) => {
  // queries mongoDB for illness, saves related foods in res locals
  console.log('hitting get foods');
  try {
    Illness.findOne({ ailment: req.body.ailment }).then((data) => {
      res.locals.foods = data.foods;
      return next();
    });
  } catch (error) {
    return next({
      log: 'Express error handler caught in getFoods handler',
      status: 500,
      message: error.message,
    });
  }
};

// foodController.getFacts = async (req, res, next) => {
//   console.log('hitting get facts');
//   res.locals.facts = [];
//   try {
//     for (const food of res.locals.foods) {
//       const newURL = preciseURL + food;
//       const response = await fetch(newURL);
//       const data = await response.json();
//       res.locals.facts.push(data);
//     }
//     console.log('length', res.locals.facts.length);
//     return next();
//   } catch (error) {
//     console.log(error);
//     // error
//     return next({
//       log: 'Express error handler caught getFacts handler',
//       status: 500,
//       message: error,
//     });
//   }
// };

foodController.getFacts = async (req, res, next) => {
  console.log('inside of getFacts in food controller');
  try {
    const facts = await Promise.all(
      res.locals.foods.map(async (food) => {
        const newURL = preciseURL + food;
        const response = await fetch(newURL);
        return response.json();
      }),
    );
    res.locals.facts = facts;
    console.log('length', res.locals.facts.length);
    return next();
  } catch (error) {
    console.log(error);
    return next({
      log: 'Express error handler caught getFacts handler',
      status: 500,
      message: error,
    });
  }
};

module.exports = foodController;

// https://api.edamam.com/api/nutrition-data?app_id=c3e5b6ff&app_key=b23cc3a2748cbdbbc9893ef62a4fffd0&nutrition-type=cooking&ingr=1%20ounce%20banana
