const path = require('path');
const mongoose = require('mongoose');
const app = require('./server');
const ENV = require('dotenv').config().parsed;

//connect to database
const NODE_ENV =
  process.env.NODE_ENV === undefined ? ENV.NODE_ENV : process.env.NODE_ENV;
console.log(`Mode = ${NODE_ENV}`);

const PORT = NODE_ENV === 'development' ? ENV.DEV_PORT : ENV.PROD_PORT;

const MONGO_URI =
  NODE_ENV === 'development'
    ? ENV.mongoDEVURI
    : NODE_ENV === 'test'
    ? ENV.mongoTESTURI
    : ENV.mongoURI;

// The server will start only if the connection to database is established
mongoose.set('strictQuery', true);
mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    dbName: 'alchemeal',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// listens, confirms connection
const server = app.listen(PORT, () => {
  console.log(`Success! Your application is running on port ${PORT}.`);
});
