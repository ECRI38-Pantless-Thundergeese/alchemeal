require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../server/models/userModel');

const allergyController = require('../server/controllers/allergyController');
const blacklistController = require('../server/controllers/blacklistController');
const dietController = require('../server/controllers/dietController');
const favoriteController = require('../server/controllers/favoriteController');

describe('Controller Functionality Tests', () => {
  // Set mock req object, res object, next function
  let req = {
    body: {},
    params: { username: 'testUser' },
  };

  let res = {
    locals: {},
  };

  let next = jest.fn();

  // Reset req and res objects and next function for each test
  beforeEach(() => {
    req = {
      body: {},
      params: { username: 'testUser' },
    };

    res = {
      locals: {},
    };

    next = jest.fn();
  });

  // Set up dummy database
  beforeAll((done) => {
    mongoose.set('strictQuery', true);

    mongoose
      .connect(process.env.mongoTESTURI, {
        dbName: 'alchemeal',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        return User.create({
          username: 'testUser',
          password: 'testUser',
        });
      })
      .then(() => done())
      .catch((err) => done(err));
  });

  // Tear down test user document and close dummy database connection
  afterAll((done) => {
    User.deleteOne({ username: 'testUser' })
      .then(() => {
        mongoose.connection.close();
        return done();
      })
      .catch((err) => done(err));
  });

  describe('Allergy Controller', () => {
    describe('Add Allergy', () => {
      it('Should add allergies to an empty allergy list', (done) => {
        req.body.allergy = ['test1', 'test2'];

        allergyController
          .addAllergy(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.allergy).toEqual(['test1', 'test2']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should add allergies to an existing list of allergies', (done) => {
        req.body.allergy = ['test3', 'test4'];

        allergyController
          .addAllergy(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.allergy).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not add duplicate allergies', (done) => {
        req.body.allergy = ['test3', 'test4'];

        allergyController
          .addAllergy(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.allergy).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not make any additions when request body is an empty array', (done) => {
        req.body.allergy = [];

        allergyController
          .addAllergy(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.allergy).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should save the updated allergy list to res.locals', (done) => {
        req.body.allergy = ['test5'];

        allergyController
          .addAllergy(req, res, next)
          .then(() => {
            expect(res.locals.allergy).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        req.body.allergy = ['test6'];

        allergyController
          .addAllergy(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.body.allergy = ['test7'];
        req.params.username = 'wrongUser';

        allergyController
          .addAllergy(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when req.body.allergy is not an array', (done) => {
        req.body.allergy = 'test8';

        allergyController
          .addAllergy(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });

    describe('Get Allergy', () => {
      it('Should save allergies to res.locals', (done) => {
        allergyController
          .getAllergy(req, res, next)
          .then(() => {
            expect(res.locals.allergy).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
              'test6',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change allergy list', (done) => {
        allergyController
          .getAllergy(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((user) => {
            expect(user.allergy).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
              'test6',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        allergyController
          .getAllergy(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.params.username = 'wrongUser';

        allergyController
          .getAllergy(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });

    describe('Delete Allergy', () => {
      it('Should remove allergies', (done) => {
        req.body.allergy = ['test4', 'test5', 'test6'];

        allergyController
          .deleteAllergy(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.allergy).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change anything when removing an allergy that is not present', (done) => {
        req.body.allergy = ['test5'];

        allergyController
          .deleteAllergy(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.allergy).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change anything when request body is an empty array', (done) => {
        req.body.allergy = [];

        allergyController
          .deleteAllergy(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.allergy).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should save updated allergy list to res.locals', (done) => {
        req.body.allergy = ['test3'];

        allergyController
          .deleteAllergy(req, res, next)
          .then(() => {
            expect(res.locals.allergy).toEqual(['test1', 'test2']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        req.body.allergy = ['test2'];

        allergyController
          .deleteAllergy(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.body.allergy = ['test1'];
        req.params.username = 'wrongUser';

        allergyController
          .deleteAllergy(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when req.body.allergy is not an array', (done) => {
        req.body.allergy = 'test8';

        allergyController
          .deleteAllergy(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });
  });

  describe('Blacklist Controller', () => {
    describe('Add Blacklist', () => {
      it('Should add blacklists to an empty blacklist list', (done) => {
        req.body.blacklist = ['test1', 'test2'];

        blacklistController
          .addBlacklist(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.blacklist).toEqual(['test1', 'test2']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should add blacklists to an existing list of blacklists', (done) => {
        req.body.blacklist = ['test3', 'test4'];

        blacklistController
          .addBlacklist(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.blacklist).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not add duplicate blacklists', (done) => {
        req.body.blacklist = ['test3', 'test4'];

        blacklistController
          .addBlacklist(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.blacklist).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not make any additions when request body is an empty array', (done) => {
        req.body.blacklist = [];

        blacklistController
          .addBlacklist(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.blacklist).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should save the updated blacklist list to res.locals', (done) => {
        req.body.blacklist = ['test5'];

        blacklistController
          .addBlacklist(req, res, next)
          .then(() => {
            expect(res.locals.blacklist).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        req.body.blacklist = ['test6'];

        blacklistController
          .addBlacklist(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.body.blacklist = ['test7'];
        req.params.username = 'wrongUser';

        blacklistController
          .addBlacklist(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when req.body.blacklist is not an array', (done) => {
        req.body.blacklist = 'test8';

        blacklistController
          .addBlacklist(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });

    describe('Get Blacklist', () => {
      it('Should save blacklist to res.locals', (done) => {
        blacklistController
          .getBlacklist(req, res, next)
          .then(() => {
            expect(res.locals.blacklist).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
              'test6',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change blacklist list', (done) => {
        blacklistController
          .getBlacklist(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((user) => {
            expect(user.blacklist).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
              'test6',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        blacklistController
          .getBlacklist(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.params.username = 'wrongUser';

        blacklistController
          .getBlacklist(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });

    describe('Delete Blacklist', () => {
      it('Should remove blacklists', (done) => {
        req.body.blacklist = ['test4', 'test5', 'test6'];

        blacklistController
          .deleteBlacklist(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.blacklist).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change anything when removing a blacklist that is not present', (done) => {
        req.body.blacklist = ['test5'];

        blacklistController
          .deleteBlacklist(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.blacklist).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change anything when request body is an empty array', (done) => {
        req.body.blacklist = [];

        blacklistController
          .deleteBlacklist(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.blacklist).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should save updated blacklist list to res.locals', (done) => {
        req.body.blacklist = ['test3'];

        blacklistController
          .deleteBlacklist(req, res, next)
          .then(() => {
            expect(res.locals.blacklist).toEqual(['test1', 'test2']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        req.body.blacklist = ['test2'];

        blacklistController
          .deleteBlacklist(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.body.blacklist = ['test1'];
        req.params.username = 'wrongUser';

        blacklistController
          .deleteBlacklist(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when req.body.blacklist is not an array', (done) => {
        req.body.blacklist = 'test8';

        blacklistController
          .deleteBlacklist(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });
  });

  describe('Diet Controller', () => {
    describe('Add Diet', () => {
      it('Should add diets to an empty diets list', (done) => {
        req.body.diet = ['test1', 'test2'];

        dietController
          .addDiet(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.diet).toEqual(['test1', 'test2']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should add diets to an existing list of diets', (done) => {
        req.body.diet = ['test3', 'test4'];

        dietController
          .addDiet(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.diet).toEqual(['test1', 'test2', 'test3', 'test4']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not add duplicate diets', (done) => {
        req.body.diet = ['test3', 'test4'];

        dietController
          .addDiet(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.diet).toEqual(['test1', 'test2', 'test3', 'test4']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not make any additions when request body is an empty array', (done) => {
        req.body.diet = [];

        dietController
          .addDiet(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.diet).toEqual(['test1', 'test2', 'test3', 'test4']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should save the updated diets list to res.locals', (done) => {
        req.body.diet = ['test5'];

        dietController
          .addDiet(req, res, next)
          .then(() => {
            expect(res.locals.diet).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        req.body.diet = ['test6'];

        dietController
          .addDiet(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.body.diet = ['test7'];
        req.params.username = 'wrongUser';

        dietController
          .addDiet(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when req.body.diet is not an array', (done) => {
        req.body.diet = 'test8';

        dietController
          .addDiet(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });

    describe('Get Diet', () => {
      it('Should save diet to res.locals', (done) => {
        dietController
          .getDiet(req, res, next)
          .then(() => {
            expect(res.locals.diet).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
              'test6',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change diet list', (done) => {
        dietController
          .getDiet(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((user) => {
            expect(user.diet).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
              'test6',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        dietController
          .getDiet(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.params.username = 'wrongUser';

        dietController
          .getDiet(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });

    describe('Delete Diet', () => {
      it('Should remove diets', (done) => {
        req.body.diet = ['test4', 'test5', 'test6'];

        dietController
          .deleteDiet(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.diet).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change anything when removing a diet that is not present', (done) => {
        req.body.diet = ['test5'];

        dietController
          .deleteDiet(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.diet).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change anything when request body is an empty array', (done) => {
        req.body.diet = [];

        dietController
          .deleteDiet(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.diet).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should save updated diet list to res.locals', (done) => {
        req.body.diet = ['test3'];

        dietController
          .deleteDiet(req, res, next)
          .then(() => {
            expect(res.locals.diet).toEqual(['test1', 'test2']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        req.body.diet = ['test2'];

        dietController
          .deleteDiet(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.body.diet = ['test1'];
        req.params.username = 'wrongUser';

        dietController
          .deleteDiet(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when req.body.diet is not an array', (done) => {
        req.body.diet = 'test8';

        dietController
          .deleteDiet(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });
  });

  describe('Favorite Controller', () => {
    describe('Add Favorite', () => {
      it('Should add favorites to an empty favorites list', (done) => {
        req.body.favorite = ['test1', 'test2'];

        favoriteController
          .addFavorite(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.favorite).toEqual(['test1', 'test2']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should add favorites to an existing list of favorites', (done) => {
        req.body.favorite = ['test3', 'test4'];

        favoriteController
          .addFavorite(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.favorite).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not add duplicate favorites', (done) => {
        req.body.favorite = ['test3', 'test4'];

        favoriteController
          .addFavorite(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.favorite).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not make any additions when request body is an empty array', (done) => {
        req.body.favorite = [];

        favoriteController
          .addFavorite(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.favorite).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should save the updated favorites list to res.locals', (done) => {
        req.body.favorite = ['test5'];

        favoriteController
          .addFavorite(req, res, next)
          .then(() => {
            expect(res.locals.favorite).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        req.body.favorite = ['test6'];

        favoriteController
          .addFavorite(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.body.favorite = ['test7'];
        req.params.username = 'wrongUser';

        favoriteController
          .addFavorite(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when req.body.favorite is not an array', (done) => {
        req.body.favorite = 'test8';

        favoriteController
          .addFavorite(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });

    describe('Get Favorite', () => {
      it('Should save favorite to res.locals', (done) => {
        favoriteController
          .getFavorite(req, res, next)
          .then(() => {
            expect(res.locals.favorite).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
              'test6',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change favorite list', (done) => {
        favoriteController
          .getFavorite(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((user) => {
            expect(user.favorite).toEqual([
              'test1',
              'test2',
              'test3',
              'test4',
              'test5',
              'test6',
            ]);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        favoriteController
          .getFavorite(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.params.username = 'wrongUser';

        favoriteController
          .getFavorite(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });

    describe('Delete Favorite', () => {
      it('Should remove favorites', (done) => {
        req.body.favorite = ['test4', 'test5', 'test6'];

        favoriteController
          .deleteFavorite(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.favorite).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change anything when removing a favorite that is not present', (done) => {
        req.body.favorite = ['test5'];

        favoriteController
          .deleteFavorite(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.favorite).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should not change anything when request body is an empty array', (done) => {
        req.body.favorite = [];

        favoriteController
          .deleteFavorite(req, res, next)
          .then(() => {
            return User.findOne({ username: 'testUser' });
          })
          .then((testUser) => {
            expect(testUser.favorite).toEqual(['test1', 'test2', 'test3']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should save updated favorite list to res.locals', (done) => {
        req.body.favorite = ['test3'];

        favoriteController
          .deleteFavorite(req, res, next)
          .then(() => {
            expect(res.locals.favorite).toEqual(['test1', 'test2']);
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should invoke next', (done) => {
        req.body.favorite = ['test2'];

        favoriteController
          .deleteFavorite(req, res, next)
          .then(() => {
            expect(next).toHaveBeenCalled();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when username does not exist', (done) => {
        req.body.favorite = ['test1'];
        req.params.username = 'wrongUser';

        favoriteController
          .deleteFavorite(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });

      it('Should throw error with next when req.body.favorite is not an array', (done) => {
        req.body.favorite = 'test8';

        favoriteController
          .deleteFavorite(req, res, next)
          .then(() => {
            expect(next.mock.calls[0][0]).toBeDefined();
            return done();
          })
          .catch((err) => done(err));
      });
    });
  });
  // describe('Food Controller', () => {
  //   describe('Get Foods', () => {});
  //   describe('Add Get Facts', () => {});
  //   describe('Filter Allergy', () => {});
  //   describe('Filter Diet', () => {});
  // });
  // describe('User Controller', () => {
  //   describe('Create User', () => {});
  //   describe('Verify User', () => {});
  //   describe('Get Profile', () => {});
  //   describe('Update Profile', () => {});
  //   describe('Delete User', () => {});
  // });
  // describe('Cookie Controller', () => {
  //   describe('Set Session Cookie', () => {});
  //   describe('Verify Session Cookie', () => {});
  //   describe('Remove Session Cookie', () => {});
  // });
  // describe('OAuth Controller', () => {
  //   describe('Generate Google URL', () => {});
  //   describe('authenticate Google User', () => {});
  // });
});
