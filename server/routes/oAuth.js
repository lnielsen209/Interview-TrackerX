const express = require('express');
const { router } = require('../server');
const authRouter = express.Router({ mergeParams: true });
require('../config/passport-config');
const passport = require('passport');
const authController = require('../controllers/authController');

//auth with google
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/redirect',
  passport.authenticate('google'),
  authController.createAuthToken,
  (req, res) => {
    res.redirect('/');
  }
);

authRouter.get(`/signin`, authController.verifyAuthToken, (req, res) => {
  res.status(200).json({
    id: res.locals.id,
    email: res.locals.email,
  });
});

module.exports = authRouter;
