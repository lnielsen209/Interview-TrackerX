const express = require('express');
const applicationsController = require('../controllers/applicationsController');
const authController = require('../controllers/authController');

const applicationRouter = express.Router();

// applicationRouter -> /applications
applicationRouter.get(
  '/',
  authController.verifyToken,
  applicationsController.getAllApps,
  (req, res) => {
    return res.send(res.locals.userData);
  }
);

// add new application
applicationRouter.post(
  '/',
  authController.verifyToken,
  applicationsController.addApp,
  (req, res) => {
    res.status(201).json({});
  }
);

// edit app
applicationRouter.put(
  '/',
  authController.verifyToken,
  applicationsController.editApp,
  (req, res) => {
    res.status(200).json({});
  }
);

// delete application
applicationRouter.delete(
  '/',
  authController.verifyToken,
  applicationsController.deleteApp,
  (req, res) => {
    res.status(204).json(res.locals.message);
  }
);

module.exports = applicationRouter;
