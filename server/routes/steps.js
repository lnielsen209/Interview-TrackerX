const express = require('express');
const stepController = require('../controllers/stepController');
const sessionController = require('../controllers/sessionController');

const stepRouter = express.Router({ mergeParams: true });

// starts at /:app_id/step
// get all steps for this application id
stepRouter.get(
  '/',
  sessionController.isLoggedIn,
  stepController.getAllSteps,

  (req, res) => {
    console.log('getSteps===>', res.locals),
      res.status(200).json(res.locals.stepData);
  }
);

// add new step
stepRouter.post(
  '/',
  sessionController.isLoggedIn,
  stepController.addStep,
  (req, res) => {
    res.status(200).json({});
  }
);

// edit step
stepRouter.put(
  '/:step_id',
  sessionController.isLoggedIn,
  stepController.editStep,
  (req, res) => {
    res.status(200).json({});
  }
);

// delete step
stepRouter.delete(
  '/:step_id',
  sessionController.isLoggedIn,
  stepController.deleteStep,
  (req, res) => {
    res.status(200).json({});
  }
);

module.exports = stepRouter;
