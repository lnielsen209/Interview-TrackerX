const db = require('../models/model.js');

const applicationsController = {};

applicationsController.getAllApps = (req, res, next) => {
  const userID = res.locals.userID
  const queryText =
    'SELECT * FROM applications WHERE applicant_id = $1 ORDER BY id ASC';
  db.query(queryText, [userID])
    .then((data) => {
      res.locals.userData = data.rows[0]; //appsData?
      return next();
    })
    .catch((err) => {
      return next({
        log:
          `applicationsController.getUserData: ERROR: Error getting database ${err}`,
        message: {
          err: `${err.message}`,
        },
      });
    });
};

applicationsController.addApp = (req, res, next) => {
  const userID = res.locals.userID
  const {
    company,
    job_title,
    how_applied,
    url,
    date_applied,
    location,
    found_by,
    notes,
    app_status,
  } = req.body;

  const queryText =
    'INSERT INTO applications (applicant_id, company, job_title, how_applied, url, date_applied, location, found_by, notes, app_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';

  db.query(queryText, [
    userID,
    company,
    job_title,
    how_applied,
    url,
    date_applied,
    location,
    found_by,
    notes,
    app_status,
  ])
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next({
        log: `applicationsController.addApp: Error writing to database ERROR: ${err}`,
        status: 400,
        message: {
          err: err.message,
        },
      });
    });
};

applicationsController.deleteApp = (req, res, next) => {
  const queryText = 'DELETE FROM applications WHERE id = $1';
  const value = [req.params.app_id];

  db.query(queryText, value)
    .then((data) => {
      res.locals.message = { message: 'application deleted' }
      return next();
    })
    .catch((err) => {
      return next({
        log:
          `applicationsController.deleteApp: Error deleting application from database ERROR: ${err}`,
        status: 400,
        message: {
          err: err.message,
        },
      });
    });
};

applicationsController.editApp = (req, res, next) => {
  const {
    company,
    job_title,
    how_applied,
    url,
    date_applied,
    location,
    found_by,
    notes,
    app_status,
  } = req.body;
  const queryText = `UPDATE applications 
                     SET company = $1, 
                     job_title = $2, 
                     how_applied = $3, 
                     url = $4,
                     date_applied = $5, 
                     location = $6, 
                     found_by = $7, 
                     notes = $8, 
                     app_status= $9
                     WHERE id = $10`;
  const queryVals = [
    company,
    job_title,
    how_applied,
    url,
    date_applied,
    location,
    found_by,
    notes,
    app_status,
    Number(req.params.app_id),
  ];
  console.log(queryVals);
  db.query(queryText, queryVals)
    .then(({ rows }) => {
      res.locals.transaction = rows;
      return next();
    })
    .catch((err) => {
      return next({
        log:
          'applicationsController.updateApp: ERROR: Error updating application in database',
        message: {
          err: `${err.message}`,
        },
      });
    });
};

module.exports = applicationsController;
