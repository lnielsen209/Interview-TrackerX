const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const db = require('../models/model.js');

const authController = {};

const maxAge = 3600;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// create token
authController.generateToken = (req, res, next) => {
  const { id } = res.locals;
  try {
    const token = createToken(id);
    // res.cookie('token', token, { httpOnly: true, maxAge: maxAge });
    res.locals.token = token;
    return next();
  } catch (err) {
    return next({
      log: `authController.startSession: Unable to add JWT token ERROR: ${err}`,
      message: {
        err: err.message,
      },
    });
  }
};

// Need to be refactor b/c front end can check if token exist and re-direct using react routers
authController.verifyToken = async (req, res, next) => {
  // const token = req.cookies.token;
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token.startsWith('Bearer')) {
    token = token.slice(7, token.length);
  }

  try {
    if (!token) {
      throw new Error('Unauthorized!');
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    res.locals.userID = decodedToken.id;
    return next();
  } catch (err) {
    return next({
      log: `authController.verifyToken: Unable to verify JWT token ERROR: ${err}`,
      status: 401,
      message: {
        err: err.message,
      },
    });
  }
};

authController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) throw new Error('fields can not be empty');
  try {
    const queryText = `SELECT * FROM applicants WHERE email = $1`;
    const value = [username];
    const data = await db.query(queryText, value);
    if (data.rows.length === 0) {
      throw new Error('email does not exist!'); //this will throw us to catch block and the error message will be sent via global error handler
    }
    const hashedPassword = data.rows[0].password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      throw new Error('Password is incorrect!'); //this will throw us to catch block and the error message will be sent via global error handler
    }
    res.locals.id = data.rows[0].id;
    res.locals.email = data.rows[0].email;
    return next();
  } catch (err) {
    return next({
      log: `usersController.verifyUser: Unable to verify user data. ERROR: ${err}`,
      status: 401,
      message: {
        err: err.message,
      },
    });
  }
};

module.exports = authController;
