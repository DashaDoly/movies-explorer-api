const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('http2').constants;
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { USER_CONFLICT_ERROR_MESSAGE, USER_NOT_FOUND_ERROR_MESSAGE } = require('../utils/constants');

const { SECRET_KEY = 'secret-key' } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => res.status(HTTP_STATUS_CREATED).send({
        name: user.name, email: user.email,
      })) // status = 201
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError(USER_CONFLICT_ERROR_MESSAGE));
        } else if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError(err.message));
        } else {
          next(err);
        }
      }));
};

module.exports.getMeUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(HTTP_STATUS_OK).send({
      name: user.name, email: user.email,
    }))
    .catch(next);
};

module.exports.editUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true }) // new - для возврата обновленных данных, runValidators - для валидации полей
    .orFail()
    .then((user) => { res.status(HTTP_STATUS_OK).send(user); }) // status = 200
    .catch((err) => {
      switch (err.constructor) {
        case mongoose.Error.DocumentNotFoundError:
          next(new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE));
          break;
        case mongoose.Error.ValidationError:
          next(new BadRequestError(err.message));
          break;
        default:
          next(err);
          break;
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.status(HTTP_STATUS_OK).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
