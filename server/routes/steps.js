const express = require('express');
const stepsController = require('../controllers/stepsController');
const authController = require('../controllers/authController');

const stepRouter = express.Router({ mergeParams: true });

// stepRouter -> /user/:user_id/application/:app_id/step
stepRouter.get(
  '/',
  authController.verifyToken,
  stepsController.getAllSteps,
  (req, res) => {
    res.status(200).json(res.locals.stepsData);
  }
);

// add new step
stepRouter.post(
  '/',
  authController.verifyToken,
  stepsController.addStep,
  (req, res) => {
    res.status(200).json({});
  }
);

// edit step
stepRouter.put(
  '/:step_id',
  authController.verifyToken,
  stepsController.editStep,
  (req, res) => {
    res.status(200).json({});
  }
);

// delete step
stepRouter.delete(
  '/:step_id',
  authController.verifyToken,
  stepsController.deleteStep,
  (req, res) => {
    res.status(200).json({});
  }
);

module.exports = stepRouter;
