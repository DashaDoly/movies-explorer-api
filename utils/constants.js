const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const emailRegex = /^\S+@\S+\.\S+$/;

const REQUIRED_FIELD_MESSAGE = 'Обязательное поле';
const INVALID_MINLENGTH_MESSAGE = (n) => `Минимальное количество символов ${n}`;
const INVALID_MAXLENGTH_MESSAGE = (n) => `Максимальное количество символов ${n}`;
const INVALID_EMAIL_MESSAGE = 'Указан некорректный email';
const INVALID_URL_MESSAGE = 'Указан некорректный URL-адрес';

const USER_CONFLICT_ERROR_MESSAGE = 'Пользователь с данными email уже зарегистрирован';
const USER_NOT_FOUND_ERROR_MESSAGE = 'Пользователь с данным id - не найден';

const MOVIE_NOT_FOUND_ERROR_MESSAGE = 'Фильм с данным id не найден';
const MOVIE_FORBIDDEN_ERROR_MESSAGE = 'Фильм создан другим пользователем';
const MOVIE_BAD_REQUEST_ERROR_MESSAGE = 'Некорректный id фильма';
const MOVIE_SUCCESS_DELETE_MESSAGE = 'Фильм удален';

const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';

module.exports = {
  urlRegex,
  emailRegex,
  REQUIRED_FIELD_MESSAGE,
  INVALID_MINLENGTH_MESSAGE,
  INVALID_MAXLENGTH_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  INVALID_URL_MESSAGE,
  USER_CONFLICT_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  MOVIE_NOT_FOUND_ERROR_MESSAGE,
  MOVIE_FORBIDDEN_ERROR_MESSAGE,
  MOVIE_BAD_REQUEST_ERROR_MESSAGE,
  MOVIE_SUCCESS_DELETE_MESSAGE,
  SERVER_ERROR_MESSAGE,
};
