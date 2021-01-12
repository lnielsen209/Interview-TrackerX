const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const app = express();

const userRouter = require('./routes/users');
const oAuthRouter = require('./routes/oAuth');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Route Handlers
//oAuth router
//==> auth/google
app.use('/auth', oAuthRouter);

app.use('/user', userRouter);

//Default Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log('default err --->', err);

  console.log('errorObj.message===>', errorObj.message);
  console.log('errorObj.status===>', errorObj.status);
  return res.status(errorObj.status).json(errorObj.message);
});

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

// Catch-all to unknown routes (404)
app.use((req, res) => res.sendStatus(404));

//Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
