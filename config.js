require('dotenv').config();

const {
  SECRET_KEY,
  MONGO_URL,
  NODE_ENV,
} = process.env;

module.exports = {
  SECRET_KEY: NODE_ENV === 'production' ? SECRET_KEY : 'secret-key',
  MONGO_URL: NODE_ENV === 'production' ? MONGO_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb',
};
