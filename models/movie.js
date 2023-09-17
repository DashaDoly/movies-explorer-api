const mongoose = require('mongoose');
const { REQUIRED_FIELD_MESSAGE, INVALID_MINLENGTH_MESSAGE } = require('../utils/constants');
const { validatorUrl } = require('../middlewares/validation');

const requiredString = {
  type: String,
  required: [true, REQUIRED_FIELD_MESSAGE],
  minlength: [2, INVALID_MINLENGTH_MESSAGE(2)],
};

const requiredUrl = {
  type: String,
  required: [true, REQUIRED_FIELD_MESSAGE],
  validate: validatorUrl,
};

// описываем схему
const cardSchema = new mongoose.Schema({
  country: requiredString,
  director: requiredString,
  duration: {
    type: Number,
    required: [true, REQUIRED_FIELD_MESSAGE],
  },
  year: requiredString,
  description: requiredString,
  image: requiredUrl,
  trailerLink: requiredUrl,
  thumbnail: requiredUrl,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: requiredString,
  nameEN: requiredString,
}, { versionKey: false });

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
