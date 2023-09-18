const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedErrorError = require('../errors/UnauthorizedErrorError');

const { REQUIRED_FIELD_MESSAGE, INVALID_MINLENGTH_MESSAGE, INVALID_MAXLENGTH_MESSAGE } = require('../utils/constants');
const { validatorEmail } = require('../middlewares/validation');

// описываем схему
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, REQUIRED_FIELD_MESSAGE],
    minlength: [2, INVALID_MINLENGTH_MESSAGE(2)],
    maxlength: [30, INVALID_MAXLENGTH_MESSAGE(30)],
  },
  email: {
    type: String,
    required: [true, REQUIRED_FIELD_MESSAGE],
    unique: true,
    validate: validatorEmail,
  },
  password: {
    type: String,
    required: [true, REQUIRED_FIELD_MESSAGE],
    minlength: [3, INVALID_MINLENGTH_MESSAGE(3)],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedErrorError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedErrorError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
