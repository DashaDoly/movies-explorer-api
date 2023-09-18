require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const routes = require('./routes');
const indexRouter = require('./routes/index');
const { MONGO_URL } = require('./config');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL);

app.use(requestLogger); // подключаем логгер запросов

app.use(rateLimiter);

app.use('/', indexRouter);
// app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT);

// app.listen(PORT, () => {
//   console.log(`Server is up & listening to port ${PORT}.`);
// });
