const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  allergy: {
    type: Array,
    default: [],
  },
  diet: {
    type: Array,
    default: [],
  },
  favorite: {
    type: Array,
    default: [],
  },
  blacklist: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
