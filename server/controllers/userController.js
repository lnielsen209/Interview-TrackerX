const db = require('../models/model.js');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, selectedAvatar } = req.body;
    console.log('avatar==>', selectedAvatar);

    if (!first_name || !last_name || !email || !password)
      return res.sendStatus(401);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createUserText =
      'INSERT INTO applicants (first_name, last_name, email, password, avatar) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const createUserVals = [
      first_name,
      last_name,
      email,
      hashedPassword,
      selectedAvatar,
    ];
    const data = await db.query(createUserText, createUserVals);
    console.log(data.rows[0]);
    res.locals.id = data.rows[0].id;
    res.locals.email = data.rows[0].email;
    res.locals.firstname = data.rows[0].first_name;
    res.locals.avatar = data.rows[0].avatar;
    console.log('avatarfilename==>', res.locals.avatar);

    return next();
  } catch (err) {
    console.log('createUser err==>', err);
    return next({
      log: 'usersController.addUser: ERROR: Error writing to database',
      message: {
        err: err.message,
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
    res.locals.email = data.rows[0].email; //=>email
    res.locals.firstname = data.rows[0].first_name;
    console.log('verifyuserAvatar==>', data.rows[0]);
    res.locals.avatar = data.rows[0].avatar;

    return next();
  } catch (err) {
    return next({
      log: 'usersController.verifyUser: ERROR: Unable to verify user data.',
      status: 401,
      message: {
        err: err.message,
      },
    });
  }
};

module.exports = userController;
