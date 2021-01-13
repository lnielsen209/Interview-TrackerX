const db = require('../models/model.js');

const applicationController = {};

applicationController.addApp = (req, res, next) => {
  const UID = res.locals.userID;
  console.log('UID is:', UID);
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

  const addApp =
    'INSERT INTO applications (applicant_id, company, job_title, how_applied, url, date_applied, location, found_by, notes, app_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ';

  db.query(addApp, [
    UID,
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
      console.log('addAPP err ==>', err);
      return next({
        log: 'applicationsController.addApp: ERROR: Error writing to database',
        message: {
          err: err.message,
        },
      });
    });
};

applicationController.deleteApp = (req, res, next) => {
  const queryText = 'DELETE FROM applications WHERE id = $1 ';
  const queryVal = [req.params.app_id];

  db.query(queryText, queryVal)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next({
        log:
          'applicationsController.deleteApp: ERROR: Error deleting application from database',
        message: {
          err: err.message,
        },
      });
    });
};

applicationController.editApp = (req, res, next) => {
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
                     WHERE id = $10
                     `;
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

  db.query(queryText, queryVals)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next({
        log:
          'applicationsController.updateApp: ERROR: Error updating application in database',
        message: {
          err: err.message,
        },
      });
    });
};

applicationController.getAllApps = (req, res, next) => {
  const UID = res.locals.userID;
  console.log('getallApps UID==>', UID);
  // get user's personal data
  const getAppData =
    'SELECT * FROM applications WHERE applicant_id = $1 ORDER BY id ASC';
  db.query(getAppData, [UID])
    .then((data) => {
      console.log('data.rows==>', data.rows);
      res.locals.userData = data.rows;
      return next();
    })
    .catch((err) => {
      console.log('getallApps===>', err);
      return next({
        log:
          'applicationsController.getUserData: ERROR: Error getting database',
        message: {
          err: err.message,
        },
      });
    });
};

module.exports = applicationController;
