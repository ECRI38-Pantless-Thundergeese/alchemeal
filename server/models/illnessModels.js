const mongoose = require('mongoose');

const illnessSchema = new mongoose.Schema({
  ailment: {
    type: String,
    required: true,
  },
  foods: [
    {
      type: String,
    },
  ],
});

const Illness = mongoose.model('Illness', illnessSchema);

module.exports = Illness;

