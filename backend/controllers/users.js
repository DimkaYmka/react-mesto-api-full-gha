/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const userSchema = require('../models/user');

const NotFoundError = require('../errors/400');
const AuthError = require('../errors/401');
const BadRequestError = require('../errors/404');
const ConflictError = require('../errors/409');

module.exports.getUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const userId = req.params.id;

  userSchema.findById(userId)
    .orFail(() => new Error('Not found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        return next(new NotFoundError('Пользователь с данным id не существует.'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Пользователь с данным id не существует.'));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      userSchema.create({ ...req.body, password: hashedPassword })
        .then((user) => {
          res.send({ data: user });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new NotFoundError('Переданы некорректные данные'));
          }
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с таким email уже существует'));
          }
          return next(err);
        });
    });
};

module.exports.login = (req, res, next) => {
  // Вытащить email и password
  const { email, password } = req.body;
  // Проверить существует ли пользователь с таким email
  userSchema.findOne({ email })
    .select('+password')
    .orFail(() => new AuthError('Неправильный логин или пароль'))
    .then((user) => {
      // Проверить совпадает ли пароль
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            // создать JWT
            const token = jsonWebToken.sign({
              _id: user._id,
            }, 'JWT_SECRET');
            // прикрепить его к куке
            res.cookie('jwt', token, {
              maxAge: 3600000,
              httpOnly: true,
              sameSite: 'none',
            });
            // Если совпадает -- вернуть пользователя
            res.send(user.toJSON());
          } else {
            // Если не совпадает -- вернуть ошибку
            return next(new AuthError('Неправильный логин или пароль'));
          }
        });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  userSchema.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с данным id не существует.');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequestError('Переданы некорректные данные.'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Пользователь с данным id не существует.'));
      } else {
        next(err);
      }
    });
};

const changeUserData = (id, newData, res, next) => {
  userSchema.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь с с данным id не существует.'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return changeUserData(req.user._id, { name, about }, res, next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return changeUserData(req.user._id, { avatar }, res, next);
};
