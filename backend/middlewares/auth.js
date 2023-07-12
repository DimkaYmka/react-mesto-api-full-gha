const jwt = require('jsonwebtoken');
const AuthError = require('../errors/401');
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    return next(new AuthError('Необходимо авторизоваться.'));
  }

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')
  } catch (err) {
    return next(new AuthError('Необходимо авторизоваться.'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;

// const auth = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization.startsWith('Bearer')) {
//     return (new AuthError('Необходимо авторизоваться.'));
//   }
//   const token = authorization.split('Bearer ')[1];
//   let payload;
//   try {
//     payload = jwt.verify(token, 'JWT_SECRET');
//   } catch (err) {
//     return next(new AuthError('Необходимо авторизоваться.'));
//   }

//   req.user = payload;
//   return next();
// };

// module.exports = auth;