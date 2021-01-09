const db = require('../models/model.js');
const { sendEmail } = require('../emails/accounts');

const stepsController = {};

stepsController.getAllSteps = (req, res, next) => {
  const userID = res.locals.userID
  const queryData = `SELECT * FROM steps WHERE app_id = $1 ORDER BY id ASC`;
  db.query(queryData, [userID])
    .then((data) => {
      res.locals.stepsData = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log:
        `stepsController.getAllSteps: Error getting steps from database ERROR: {err}`,
        message: {
          err: err.message,
        },
      });
    });
};

stepsController.addStep = (req, res, next) => {
  const {
    appId,
    date,
    step_type,
    contact_name,
    contact_role,
    contact,
    notes,
  } = req.body;

  const queryText = `INSERT INTO steps 
  (app_id, date, step_type, contact_name, contact_role, contact_info, notes) 
  VALUES ($1, $2, $3, $4, $5, $6, $7);`;

  const values = [
    appId,
    date,
    step_type,
    contact_name,
    contact_role,
    contact,
    notes,
  ];

  db.query(queryText, values)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next({
        log: `stepsController.addStep: Error writing to database ERROR: ${err}`,
        message: {
          err: err.message,
        },
      });
    });
};

stepsController.deleteStep = (req, res, next) => {
  const queryText = `DELETE FROM steps WHERE id = $1`;
  const value = [req.params.step_id];

  db.query(queryText, queryVal)
    .then(( data ) => {
      return next();
    })
    .catch((err) => {
      return next({
        log:
          `stepsController.deleteStep: Error deleting application from database ERROR: ${err}`,
        message: {
          err: err.message,
        },
      });
    });
};

stepsController.editStep = (req, res, next) => {
  const {
    date,
    step_type,
    contact_name,
    contact_role,
    contact,
    notes,
  } = req.body;

  const queryText = `UPDATE steps SET 
  date = $1, 
  step_type = $2, 
  contact_name = $3, 
  contact_role = $4, 
  contact_info = $5, 
  notes = $6
  WHERE id = $7

  RETURNING *
  `;

  const values = [
    date,
    step_type,
    contact_name,
    contact_role,
    contact,
    notes,
    Number(req.params.step_id),
  ];
  db.query(queryText, values)
    .then((data) => {
      // TODO
      res.locals.step = data.rows;
      const { first_name, email } = res.locals.user;
      const { step_type, contact_name, date } = res.locals.step[0];
      sendEmail(email, first_name, step_type, date, contact_name);
      return next();
    })
    .catch((err) => {
      return next({
        log:
          'stepsController.updateStep: ERROR: Error updating application in database ${err}',
        message: {
          err: err.message,
        },
      });
    });
};

module.exports = stepsController;
