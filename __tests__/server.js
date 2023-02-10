const request = require('supertest');
const { AILMENTS } = require('../constants');
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

  test('GET /', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /tet\/html/)
      .expect(200);
    done();
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

  test('GET /signup', (done) => {
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({
        username: 'test',
        password: 'test',
      })
      .expect(200);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({
        username: 'usertest',
        password: 'test',
      })
      .expect(200);
    done();
  });

  test('Error Handling /signup: ', (done) => {
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({}) //empty body
      .expect(500);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: 'test' }) //no password field
      .expect(500);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ password: 'test' }) //no username field
      .expect(500);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: '', password: 'test' }) //empty username field
      .expect(500);
    request(app)
      .post('/signup')
      .expect('Content-Type', /json/)
      .send({ username: 'test', password: '' }) //empty password field
      .expect(500);
    done();
  });

  test('POST /login', (done) => {
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({
        username: 'test',
        password: 'test',
      })
      .expect(200);
    done();
  });

  test('Error Handling /login: ', (done) => {
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({}) //empty body
      .expect(500);
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({ username: 'test' }) //no password field
      .expect(500);
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({ password: 'test' }) //no username field
      .expect(500);
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({ username: '', password: 'test' }) //empty username field
      .expect(500);
    request(app)
      .post('/login')
      .expect('Content-Type', /json/)
      .send({ username: 'test', password: '' }) //empty password field
      .expect(500);
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
