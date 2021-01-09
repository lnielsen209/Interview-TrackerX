const express = require('express');

const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController');
const userRouter = express.Router();
const router = express.Router();

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Authorization, Origin, Content-Type, Accept'
  );
  return next();
});

// userRouter -> /user
// Get user data at login
userRouter.get(
  '/',
  authController.verifyToken,
  userController.getUserData,
  (req, res) => {
    res.status(200).json(res.locals.userData);
  }
);

userRouter.post(
  '/signup',
  userController.createUser,
  authController.generateToken,
  (req, res) => {
    res.status(200).json({ id: res.locals.id, token: res.locals.token, email: res.locals.email});
  }
);

userRouter.post(
  '/login',
  authController.verifyUser,
  authController.generateToken,
  (req, res) => {
    res.status(200).json({ id: res.locals.id, token: res.locals.token, email: res.locals.email });
  }
);

// We won't need this because front end would delete token @ logout from localStorage + login and signup always generate a new token
// userRouter.get('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.sendStatus(200);
// });

module.exports = userRouter;
