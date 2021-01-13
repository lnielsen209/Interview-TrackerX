const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models/model.js');

const sessionController = {};

const maxAge = 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

sessionController.startSession = (req, res, next) => {
  const { id } = res.locals;

  console.log('id-->', id);
  try {
    const token = createToken(id);
    res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 1000 });

    return next();
  } catch (err) {
    console.log('startsession err===>', err);
    return next({
      log: 'sessionController.startSession: ERROR: Unable to add JWT token',
      message: {
        err: err.message,
      },
    });
  }
};

sessionController.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('token===>', token);

  //check if the token exists
  //if doesn't exist, redirect to signin in the frontend
  try {
    if (!token) {
      throw new Error('session expires, please log in again');
    }
    //if token exists, verify the token
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log('decodedToken--->', decodedToken);

    //save userID on res.locals
    res.locals.userID = decodedToken.id;
    return next();
  } catch (err) {
    //redirect to signin page in the frontend
    return next({
      log: `sessionController.isLoggedIn: Unable to verify JWT token ERROR: ${err}`,
      status: 401,
      message: {
        err: err.message,
      },
    });
  }
};

module.exports = sessionController;
