const request = require('supertest');
const AILMENTS = require('../constants');
const app = require('../server/server');
const Illness = require('../server/models/illnessModels');
const User = require('../server/models/userModel');
// const NODE_ENV = process.env.NODE_ENV;
// added a test database that is cloned from development

describe('Server Route Testing', () => {
  // console.log(`Mode = ${process.env.NODE_ENV}`);

  const favorite = 'stuff';
  const food = 'stuff';
  let server;
  // added manually in the db b/c beforeAll is terrible...
  // const ailment1 = new Illness({ ailment: 'test1', foods: [] });
  // const ailment2 = new Illness({ ailment: 'test2' });
  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    User.deleteOne({ username: 'test' }).catch((err) => {});
    User.deleteOne({ username: 'usertest' }).catch((err) => {});
    server.close(done);
  });

  describe('GET /', (done) => {
    it('responds with 200 status and text/html content type', () => {
      request(app)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });

  test('POST /search', (done) => {
    AILMENTS.forEach((elem, i) =>
      request(app)
        .post('/search')
        .expect('Content-Type', /json/)
        .send({
          ailment: elem,
        })
        .expect(200)
    );
    done();
  });

  test('Error Handling /search: ', (done) => {
    request(app)
      .post('/search')
      .expect('Content-Type', /json/)
      .send({}) //empty body
      .expect(500);
    request(app)
      .post('/search')
      .expect('Content-Type', /json/)
      .send({ ailment: 'N/A' }) //search not found
      .expect(500);
    request(app)
      .post('/search')
      .expect('Content-Type', /json/)
      .send({ ailment: 'test1' }) //empty food array
      .expect(500);
    request(app)
      .post('/search')
      .expect('Content-Type', /json/)
      .send({ ailment: 'test2' }) //no food element
      .expect(500);
    done();
  });

  test('POST /signup', (done) => {
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({
        username: 'user-test',
        password: 'password-test',
      })
      .expect(200);
    done();
  });

  test('Error Handling /signup: ', (done) => {
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({}) //empty body
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: 'test' }) //no password field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ password: 'test' }) //no username field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: '', password: 'test' }) //empty username field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: 'test', password: '' }) //empty password field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: '01234', password: '01234567' }) // length less than 6 in username field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({
        username: '0123456789012345678901234567890',
        password: '01234567',
      }) // length more than 30 in username field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: '012345', password: '0123456' }) // length less than 8 in password field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: 1, password: 'password-test' }) // number in username field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: ['username'], password: 'password-test' }) // object in username field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: 'user-test', password: 1 }) // number in password field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: 'user-test', password: ['password'] }) // object in password field
      .expect(400);
    done();
  });

  test('POST /login', (done) => {
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({
        username: 'user-test',
        password: 'password-test',
      })
      .expect(200);
    done();
  });

  test('Error Handling /login: ', (done) => {
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({}) //empty body
      .expect(400);
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({ username: 'test' }) //no password field
      .expect(400);
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({ password: 'test' }) //no username field
      .expect(400);
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({ username: '', password: 'test' }) //empty username field
      .expect(400);
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({ username: 'test', password: '' }) //empty password field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: 1, password: 'password-test' }) // number in username field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: ['username'], password: 'password-test' }) // object in username field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: 'user-test', password: 1 }) // number in password field
      .expect(400);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: 'user-test', password: ['password'] }) // object in password field
      .expect(400);
    done();
  });

  test('PATCH /user/addfav', (done) => {
    request(app)
      .post('/user/addfav/test')
      .expect('Content-Type', /json/)
      .send({
        favorite,
      })
      .expect(200);
    done();
  });

  test('Error Handling /user/addfav: ', (done) => {
    request(app)
      .post('/user/addfav/test')
      .expect('Content-Type', /json/)
      .send({}) //empty body
      .expect(500);
    request(app)
      .post('/user/addfav/not-a-user')
      .expect('Content-Type', /json/)
      .send({ favorite: 'test' }) //bad username
      .expect(500);
    request(app)
      .post('/user/addfav/test')
      .expect('Content-Type', /json/)
      .send({ favorite: '' }) //empty field
      .expect(500);
    done();
  });

  test('GET /user', (done) => {
    request(app)
      .post('/user/test')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => expect(res.body).toEqual(favorite));
    done();
  });

  test('Error Handling /user: ', (done) => {
    request(app)
      .post('/user/not-a-user') //not a user
      .expect('Content-Type', /json/)
      .expect(500);
    request(app)
      .post('/user/usertest') //no favorite element
      .expect('Content-Type', /json/)
      .expect(500);
    done();
  });

  test('PATCH /user/deletefav', (done) => {
    request(app)
      .post('/user/deletefav/test')
      .expect('Content-Type', /json/)
      .send({
        food,
      })
      .expect(200)
      .expect((res) => expect(res.body).toEqual(''));
    done();
  });

  test('Error Handling /user/deletefav: ', (done) => {
    request(app)
      .post('/user/deletefav/not-a-user') //not a user
      .expect('Content-Type', /json/)
      .expect(500);
    request(app)
      .post('/user/deletefav/usertest') //no favorite element
      .expect('Content-Type', /json/)
      .expect(500);
    done();
  });
});

// cookie tests
// update fav tests
// db tests
