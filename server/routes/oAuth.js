const express = require('express');
const { router } = require('../server');
const authRouter = express.Router({ mergeParams: true });
require('../config/passport-config');
const passport = require('passport');

authRouter.get(`/login`, (req, res) => {});

authRouter.get('/logout', (req, res) => {
  //passport

  res.send('logging out');
});

//auth with google
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/redirect',
  passport.authenticate('google'),
  (req, res) => {
    console.log('in redirect');
    res.status(200).json(req.user);
  }
);

module.exports = authRouter;
