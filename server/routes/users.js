const express = require('express');

const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController');

const applicationRouter = require('../routes/applications');

const router = express.Router();

// Route to create a new user
router.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  (req, res) => {
    res.status(200).json({ id: res.locals.id });
  }
);

router.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  (req, res) => {
    res.status(200).json({ id: res.locals.id });
  }
);

// get user data at login
router.get('/:user_id', userController.getUserData, (req, res) => {
  res.status(200).json(res.locals.userData);
});

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

router.use('/:user_id/application', applicationRouter);

module.exports = router;
