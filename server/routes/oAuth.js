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
    res.redirect('http://localhost:8080/');
  }
);

authRouter.get(`/login`, authController.verifyAuthToken, (req, res) => {
  console.log('im in');
  console.log(res.locals);
  res.status(200).json({ fortune: res.locals.fortune });
});

authRouter.get('/logout', (req, res) => {
  //passport

  res.send('logging out');
});

module.exports = authRouter;
