const db = require('../models/model.js');
const bcrypt = require('bcrypt');

const userController = {};

userController.getUserData = (req, res, next) => {
  const UID = req.params.user_id;

  // get user's personal data
  const getUserData = 'SELECT * FROM applicants WHERE id = $1';

  db.query(getUserData, [UID]) // array of variables to use in query
    .then((data) => {
      res.locals.userData = data.rows[0];
      console.log('userDAta===>', res.locals.userData);
      return next();
    })
    .catch((err) => {
      console.log('getuserdataErr--->', err);
      return next({
        log: 'usersController.getUserData: ERROR: Error getting database',
        message: {
          err: `${err.message}`,
        },
      });
    });
};

userController.createUser = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      // cur_salary,
      // DOB,
    } = req.body;

    if (!first_name || !last_name || !email || !password)
      return res.sendStatus(401);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createUserText =
      'INSERT INTO applicants (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const createUserVals = [first_name, last_name, email, hashedPassword];
    const data = await db.query(createUserText, createUserVals);
    res.locals.id = data.rows[0].id;
    res.locals.email = data.rows[0].email;

    return next();
  } catch (err) {
    console.log('createUser err==>', err);
    return next({
      log: 'usersController.addUser: ERROR: Error writing to database',
      message: {
        err: `${err.message}`,
      },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) return res.sendStatus(401);

  try {
    const verifyUserText = ` SELECT * FROM applicants WHERE email = $1`;
    const verifyUserData = [username];

    const data = await db.query(verifyUserText, verifyUserData);

    if (data.rows.length === 0) {
      throw new Error('email does not exist!'); //this will throw us to catch block and the error message will be sent via global error handler
    }

    const hashedPassword = data.rows[0].password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      throw new Error('Password is incorrect!'); //this will throw us to catch block and the error message will be sent via global error handler
    }
    res.locals.id = data.rows[0].id; //=>userid
    res.locals.email = data.rows[0].email; //=>userid
    return next();
  } catch (err) {
    return next({
      log: 'usersController.verifyUser: ERROR: Unable to verify user data.',
      status: 401,
      message: {
        err: `${err.message}`,
      },
    });
  }
};
// userController.editUser = (req, res, next) => {

// };

// userController.deleteUser = (req, res, next) => {
//     // delete all apps and all steps
// };

module.exports = userController;
