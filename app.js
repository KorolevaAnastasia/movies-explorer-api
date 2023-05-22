const express = require('express');
const mongoose = require('mongoose').default;
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const { routes } = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./errors/handleError');
const { DB_URL } = require('./utils/constants');

mongoose.connect(DB_URL)
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((error) => console.error('Ошибка подключения:', error));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

app.use(cors());

app.use(cookieParser());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
