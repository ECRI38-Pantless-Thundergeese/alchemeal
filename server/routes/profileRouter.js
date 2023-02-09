const express = require('express');
const { Profiler } = require('react');
const router = express.Router();

const allergyController = require('../controllers/allergyController');
const blacklistController = require('../controllers/blacklistController');
const dietController = require('../controllers/dietController');
const favoriteController = require('../controllers/favoriteController');
const userController = require('../controllers/userController');
const foodController = require('../controllers/foodController')

// RETURNS full profile (except for username and password)
router.get(
  '/all/:username',
  userController.getProfile,
  (req, res) => {
    const { profile } = res.locals;

    return res.status(200).json(profile);
  }
);

// UPDATE whole profile
router.patch(
  '/all/:username',
  userController.updateProfile,
  (req, res) => {
    const { profile } = res.locals;

    return res.status(200).json(profile);
  }
);

// GET allergies
router.get(
  '/allergy/:username', allergyController.getAllergy, (req, res) => {
  const { allergy } = res.locals;
  return res.status(200).json(allergy);
  }
);

// Get diets
router.get(
  '/diet/:username', dietController.getDiet, (req, res) => {
  const { diet } = res.locals;
  return res.status(200).json(diet);
  }
);

// Get favorites
router.get(
  '/favorite/:username',
  favoriteController.getFavorite,
  (req, res) => {
    const { favorite } = res.locals;
    return res.status(200).json(favorite);
  }
);

// GET blacklisted
router.get(
  '/blacklist/:username',
  blacklistController.getBlacklist,
  (req, res) => {
    const { blacklist } = res.locals;
    return res.status(200).json(blacklist);
  }
);

// ADD allergies
router.post(
  '/allergy/:username', allergyController.addAllergy, (req, res) => {
  const { allergy } = res.locals;
  return res.status(200).json(allergy);
  }
);

// ADD to diets
router.post(
  '/diet/:username', dietController.addDiet, (req, res) => {
  const { diet } = res.locals;
  return res.status(200).json(diet);
  }
);

// Add to favorites
router.post(
  '/favorite/:username',
  favoriteController.addFavorite,
  (req, res) => {
    console.log('youve returned to the router to add favs')
    const { favorite } = res.locals;
    return res.status(200).json(favorite);
  }
);

// ADD to blacklist
router.post(
  '/blacklist/:username',
  blacklistController.addBlacklist,
  (req, res) => {
    const { blacklist } = res.locals;
    return res.status(200).json(blacklist);
  }
);

// REMOVE from  allergies
router.delete(
  '/allergy/:username',
  allergyController.deleteAllergy,
  (req, res) => {
    const { allergy } = res.locals;
    return res.status(200).json(allergy);
  }
);

// REMOVE from diets
router.delete(
  '/diet/:username', dietController.deleteDiet, (req, res) => {
  const { diet } = res.locals;
  return res.status(200).json(diet);
  }
);

// REMOVE from favorites
router.delete(
  '/favorite/:username',
  favoriteController.deleteFavorite,
  (req, res) => {
    const { favorite } = res.locals;
    return res.status(200).json(favorite);
  }
);

// REMOVE from blacklist
router.delete(
  '/blacklist/:username',
  blacklistController.deleteBlacklist,
  (req, res) => {
    const { blacklist } = res.locals;
    return res.status(200).json(blacklist);
  }
);

module.exports = router;
