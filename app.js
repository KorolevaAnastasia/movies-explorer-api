const express = require('express');
const mongoose = require('mongoose').default;
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

const { PORT = 3000, NODE_ENV, DB_ENV } = process.env;
const { errors } = require('celebrate');
const {
  DB_URL, DB_CONNECT_MSG, DB_CONNECT_ERR_MSG, CRASH_TEST_MSG,
} = require('./utils/constants');
const { routes } = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./errors/handleError');

mongoose.connect(NODE_ENV ? DB_ENV : DB_URL)
  .then(() => console.log(DB_CONNECT_MSG))
  .catch((error) => console.error(DB_CONNECT_ERR_MSG, error));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(CRASH_TEST_MSG);
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
