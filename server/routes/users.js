const express = require('express');
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController');
const applicationRouter = require('../routes/applications');

const userRouter = express.Router();

// Route to create a new user
userRouter.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  (req, res) => {
    res.status(200).json({ id: res.locals.id, email: res.locals.email });
  }
);

userRouter.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  (req, res) => {
    res.status(200).json({ id: res.locals.id, email: res.locals.email });
  }
);

//log out by using sending clearCookie
userRouter.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});

userRouter.use('/:user_id/application', applicationRouter);

module.exports = userRouter;
