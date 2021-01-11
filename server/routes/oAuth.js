const express = require('express');
const { router } = require('../server');
const oAuthRouter = express.Router({ mergeParams: true });

oAuthRouter.get(`/login`, (req, res) => {});

oAuthRouter.get('/logout', (req, res) => {
  //passport

  res.send('logging out');
});

//auth with google
oAuthRouter.get('/google', (req, res) => {
  //passport...

  res.send('logging in with google');
});

module.exports = oAuthRouter;
