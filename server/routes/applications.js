const express = require('express');
const applicationController = require('../controllers/applicationController');
const sessionController = require('../controllers/sessionController');

const applicationRouter = express.Router({ mergeParams: true });

const stepRouter = require('../routes/steps');

// get all applications for this user_id
applicationRouter.get(
  '/',
  sessionController.isLoggedIn,
  applicationController.getAllApps,
  (req, res) => {
    console.log('get all apps res.locals===>', res.locals); //contains userDAta and user(userEmail)
    return res.send(res.locals);
  }
);

// add new app

applicationRouter.post(
  '/',
  sessionController.isLoggedIn,
  applicationController.addApp,
  (req, res) => {
    res.status(200).json({});
  }
);

// edit app
applicationRouter.put(
  '/:app_id',
  sessionController.isLoggedIn,
  applicationController.editApp,
  (req, res) => {
    res.status(200).json({});
  }
);

// delete app
applicationRouter.delete(
  '/:app_id',
  sessionController.isLoggedIn,
  applicationController.deleteApp,
  (req, res) => {
    res.status(200).json({});
  }
);

//the param app_id here is the application id
applicationRouter.use('/:app_id/step', stepRouter);

module.exports = applicationRouter;
