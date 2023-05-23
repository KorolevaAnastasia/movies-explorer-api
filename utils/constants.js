// errors_code
const CREATED = 201;
const BAD_REQUEST = 400;
const AUTH_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND = 404;
const CONFLICT_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;

// error_messages
const UNIQUE_USER_ERR_MSG = 'Пользователь уже существует.';
const UNIQUE_UPDATE_USER_ERR_MSG = 'Пользователь с таким email адресом уже существует.';
const NOTFOUND_USER_ERR_MSG = 'Пользователь не найден.';
const VALID_CREATE_USER_ERR_MSG = 'Некорректные данные при создании пользователя';
const VALID_UPDATE_USER_ERR_MSG = 'Некорректные данные при обновлении пользователя';

const CONFLICT_MOVIE_ERR_MSG = 'Такая запись с фильмом уже существует.';
const VALID_CREATE_MOVIE_ERR_MSG = 'Некорректные данные при добавлении фильма.';
const NOTFOUND_MOVIE_ERR_MSG = 'Передан несуществующий _id фильма.';
const FORBIDDEN_MOVIE_ERR_MSG = 'Нельзя удалить чужой фильм.';

// db_url
const DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CREATED,
  AUTH_ERROR,
  CONFLICT_ERROR,
  FORBIDDEN_ERROR,
  DB_URL,
  UNIQUE_USER_ERR_MSG,
  UNIQUE_UPDATE_USER_ERR_MSG,
  NOTFOUND_USER_ERR_MSG,
  VALID_CREATE_USER_ERR_MSG,
  VALID_UPDATE_USER_ERR_MSG,
  CONFLICT_MOVIE_ERR_MSG,
  VALID_CREATE_MOVIE_ERR_MSG,
  NOTFOUND_MOVIE_ERR_MSG,
  FORBIDDEN_MOVIE_ERR_MSG,
};
