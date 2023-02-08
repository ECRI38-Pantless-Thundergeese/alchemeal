const express = require('express');
const { Profiler } = require('react');
const router = express.Router();

const allergyController = require('../controllers/allergyController');
const blacklistController = require('../controllers/blacklistController');
const dietController = require('../controllers/dietController');
const favoriteController = require('../controllers/favoriteController');
const userController = require('../controllers/userController');

// Route to get allergy preference
// router.get('/allergy/:username', allergyController.getAllergy, (req, res) => {
//   const { allergy } = res.locals;
//   return res.status(200).json(allergy);
// });

// Route to get blacklist preference
// router.get(
//   '/blacklist/:username',
//   blacklistController.getBlacklist,
//   (req, res) => {
//     const { blacklist } = res.locals;
//     return res.status(200).json(blacklist);
//   }
// );

// Route to get diet preference
// router.get('/profile/diet/:username', dietController.getDiet, (req, res) => {
//   const { diet } = res.locals;
//   return res.status(200).json(diet);
// });

// Route to get favorite preference
// router.get(
//   '/favorite/:username',
//   favoriteController.getFavorite,
//   (req, res) => {
//     const { favorite } = res.locals;
//     return res.status(200).json(favorite);
//   }
// );

// Route to add allergy preference
router.post('/allergy/:username', allergyController.addAllergy, (req, res) => {
  const { allergy } = res.locals;
  return res.status(200).json(allergy);
});

// Route to add blacklist preference
// router.post(
//   '/blacklist/:username',
//   blacklistController.addBlacklist,
//   (req, res) => {
//     const { blacklist } = res.locals;
//     return res.status(200).json(blacklist);
//   }
// );

// Route to add diet preference
// router.post('/profile/diet/:username', dietController.addDiet, (req, res) => {
//   const { diet } = res.locals;
//   return res.status(200).json(diet);
// });

// Route to add favorite preference
router.post(
  '/favorite/:username',
  favoriteController.addFavorite,
  (req, res) => {
    const { favorite } = res.locals;
    return res.status(200).json(favorite);
  }
);

// Route to remove allergy preference
router.delete(
  '/allergy/:username',
  allergyController.deleteAllergy,
  (req, res) => {
    const { allergy } = res.locals;
    return res.status(200).json(allergy);
  }
);

// Route to remove blacklist preference
// router.delete(
//   '/blacklist/:username',
//   blacklistController.deleteBlacklist,
//   (req, res) => {
//     const { blacklist } = res.locals;
//     return res.status(200).json(blacklist);
//   }
// );

// Route to remove diet preference
// router.delete('/diet/:username', dietController.deleteDiet, (req, res) => {
//   const { diet } = res.locals;
//   return res.status(200).json(diet);
// });

// Route to remove favorite preference
router.delete(
  '/favorite/:username',
  favoriteController.deleteFavorite,
  (req, res) => {
    const { favorite } = res.locals;
    return res.status(200).json(favorite);
  }
);

// Route to get all profile preferences
// router.get(
//   '/all/:username',
//   userController.getProfile,
//   (req, res) => {
//     const { profile } = res.locals;

//     return res.status(200).json(profile);
//   }
// );

// Route to update all profile preferences
// router.patch(
//   '/all/:username',
//   userController.updateProfile,
//   (req, res) => {
//     const { profile } = res.locals;

//     return res.status(200).json(profile);
//   }
// );

module.exports = router;
