const express = require('express');
const stepController = require('../controllers/stepController');

const router = express.Router({ mergeParams: true });

// starts at /:app_id/step
// get all steps for this application id
router.get('/', stepController.getAllSteps, (req, res) =>
  res.status(200).json(res.locals.stepData)
);

// add new step
router.post('/', stepController.addStep, (req, res) => {
  res.status(200).json({});
});

// edit step
router.put('/:step_id', stepController.editStep, (req, res) => {
  res.status(200).json({});
});

// delete step
router.delete('/:step_id', stepController.deleteStep, (req, res) => {
  res.status(200).json({});
});

module.exports = router;
