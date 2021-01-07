const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const sessionController = {};

const maxAge = 30;
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
        err: `sessionController.startSession: ERROR: ERROR ${err}`,
      },
    });
  }
};

sessionController.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('token===>', token);

  //check if the token exists
  //if doesn't exist, redirect to login in the frontend
  if (!token) return res.status(401);

  //if token exists, verify the token
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log('decodedToken--->', decodedToken);
    //decodedToken.id is the userID
    next();
  } catch (err) {
    console.log('isLogged in ERR===>', err);

    //redirect to login page in the frontend
    res.status(418); //im a teapot
    return next({
      log: 'sessionController.isLoggedIn: ERROR: Unable to verify JWT token',
      message: {
        err: `sessionController.isLogged In: ERROR: ERROR ${err}`,
      },
    });
  }
};

module.exports = sessionController;
