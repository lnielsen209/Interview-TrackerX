const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {};

const maxAge = 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

authController.createAuthToken = (req, res, next) => {
  const authID = req.user.password;
  console.log('authID===>', authID);

  try {
    const token = createToken(authID);
    console.log('fortunetoken==>', token);
    res.cookie('fortuneCookie', token, {
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    return next();
  } catch (err) {
    return next({
      log: 'sessionController.startSession: ERROR: Unable to create auth token',
      message: {
        err: err.message,
      },
    });
  }
};

authController.verifyAuthToken = async (req, res, next) => {
  const token = req.cookies.fortuneCookie;
  console.log('token===>', token);

  //check if the token exists
  //if doesn't exist, redirect to login in the frontend
  try {
    if (!token) {
      throw new Error('session expires, please log in again');
    }

    //if token exists,send back the token
    res.locals.fortune = token;

    //if token exists, verify the token
    // const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log('decodedToken--->', decodedToken);

    //save userID on res.locals
    // res.locals.userID = decodedToken.id;
    return next();
  } catch (err) {
    //redirect to login page in the frontend
    return next({
      log: `authController.verifyToken: Unable to verify auth token ERROR: ${err}`,
      status: 401,
      message: {
        err: err.message,
      },
    });
  }
};

module.exports = authController;
