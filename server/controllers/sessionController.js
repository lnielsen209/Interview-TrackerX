const jwt = require('jsonwebtoken');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  const { id } = res.locals;
  console.log('id-->', id);
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 30 });
    res.cookie('token', token, { httpOnly: true });
    return next();
  } catch (err) {
    return next({
      log: 'sessionController.startSession: ERROR: Unable to add JWT token',
      message: {
        err: `sessionController.startSession: ERROR: ERROR ${err}`,
      },
    });
  }
};

sessionController.isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401);
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return next({
      log: 'sessionController.isLoggedIn: ERROR: Unable to verify JWT token',
      message: {
        err: `sessionController.isLogged In: ERROR: ERROR ${err}`,
      },
    });
  }
};

module.exports = sessionController;
