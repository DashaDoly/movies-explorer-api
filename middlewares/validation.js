const { celebrate, Joi } = require('celebrate');
const { urlRegex, emailRegex } = require('../utils/constants');
const { INVALID_EMAIL_MESSAGE, INVALID_URL_MESSAGE } = require('../utils/constants');

const validatorEmail = {
  validator(email) {
    return emailRegex.test(email);
  },
  message: INVALID_EMAIL_MESSAGE,
};

const validatorUrl = {
  validator(url) {
    return urlRegex.test(url);
  },
  message: INVALID_URL_MESSAGE,
};

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().required().min(3),
  }).unknown(true),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().required().min(3),
  }),
});

const validateEditUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().pattern(emailRegex),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validatorEmail,
  validatorUrl,
  validateSignup,
  validateSignin,
  validateEditUser,
  validateCreateMovie,
  validateDeleteMovie,
};
