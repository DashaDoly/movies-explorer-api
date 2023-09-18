const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('http2').constants;
const { default: mongoose } = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  MOVIE_NOT_FOUND_ERROR_MESSAGE,
  MOVIE_FORBIDDEN_ERROR_MESSAGE,
  MOVIE_BAD_REQUEST_ERROR_MESSAGE,
  MOVIE_SUCCESS_DELETE_MESSAGE,
} = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      Movie.findById(movie._id)
        .orFail()
        .populate('owner')
        .then((data) => res.status(HTTP_STATUS_CREATED).send(data)) // 201
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(HTTP_STATUS_OK).send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(MOVIE_FORBIDDEN_ERROR_MESSAGE);
      }
      Movie.deleteOne(movie)
        .then(() => { res.status(HTTP_STATUS_OK).send({ message: MOVIE_SUCCESS_DELETE_MESSAGE }); })
        .catch(next);
    })
    .catch((err) => {
      switch (err.constructor) {
        case mongoose.Error.DocumentNotFoundError:
          next(new NotFoundError(MOVIE_NOT_FOUND_ERROR_MESSAGE));
          break;
        case mongoose.Error.CastError:
          next(new BadRequestError(MOVIE_BAD_REQUEST_ERROR_MESSAGE));
          break;
        default:
          next(err);
          break;
      }
    });
};
