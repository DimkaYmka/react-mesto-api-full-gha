/* eslint-disable no-unused-vars */
const router = require('express').Router();
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/400');
const {
  getUsers, getUser, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

const {
  validationCreateUser,
  validationLogin,
} = require('../middlewares/celebrate');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

// router.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('The server is about to crash');
//   }, 0);
// });

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res, next) => next(new NotFoundError('Страницы не существует')));

module.exports = router;
