const db = require('../models/model.js');

const signupController = {};

signupController.signup = (req, res, next) => {
  const { first_name, last_name, email, password, cur_salary, DOB } = req.body;

  const addUser =
    'INSERT INTO job_seekers (first_name, last_name, email, password, cur_salary, DOB) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

  db.query(addUser, [first_name, last_name, email, password, cur_salary, DOB])
    .then((data) => {
      // return something?
      console.log('data from signup:', data);
      res.locals.userId = data.rows[0].id;
      return next();
    })

    .catch((err) => {
      return next({
        log: 'signupController.addUser: ERROR: Error writing to database',
        message: {
          err: 'signupController.addUser: ERROR: Check database for details',
        },
      });
    });
};

module.exports = signupController;
