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
    res.status(200).json({ id: res.locals.id });
  }
);

userRouter.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  (req, res) => {
    res.status(200).json({ id: res.locals.id });
  }
);

//log out by replacing the token to " " and set the expiration to 1 millisecond
userRouter.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});

// get user data at login
userRouter.get(
  '/:user_id',

  userController.getUserData,
  (req, res) => {
    res.status(200).json(res.locals.userData);
  }
);

// add new user
// router.post("/", usersController.addUser, (req, res) => {
//   res.status(200).json(res.locals.userId);
// });

// edit user
// router.put('/:user_id', usersController.editUser, (req, res) => {
//   res.status(200).json({});
// });

// delete
// router.delete('/:user_id', usersController.deleteUser, (req, res) => {
//   res.status(200).json({});
// });

userRouter.use('/:user_id/application', applicationRouter);

module.exports = userRouter;
