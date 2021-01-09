const db = require('../models/model.js');
const bcrypt = require('bcrypt');

const userController = {};

userController.getUserData = (req, res, next) => {

  // get user's personal data
  const queryText = 'SELECT * FROM applicants WHERE id = $1';

  db.query(queryText, [res.locals.userID])
    .then((data) => {
      res.locals.userData = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `usersController.getUserData: Error getting database ERROR: ${err}`,
        status: 500,
        message: {
          err: err.message,
        },
      });
    });
};

userController.createUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password)
      throw new Error("fields can not be empty");

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
   
    // parameterized query
    const queryText =
      'INSERT INTO applicants (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [first_name, last_name, email, hashedPassword];
    const data = await db.query(queryText, values);
    res.locals.userID = data.rows[0].id;
    return next();
  } catch (err) {
    return next({
      log: `usersController.addUser: Error writing to database ERROR: ${err}`,
      status: 401,
      message: {
        err: err.message,
      },
    });
  }
};

module.exports = userController;
