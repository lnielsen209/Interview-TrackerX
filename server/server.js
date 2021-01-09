const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRouter = require('./routes/users');
const applicationRouter = require('./routes/applications');
const stepRouter = require('./routes/steps');

// Routes for express application
app.use('/user', userRouter);
app.use('/applications', applicationRouter);
app.use('/applications/:app_id/steps', stepRouter);

// Catch-all to unknown routes (404)
app.use((req, res) => res.sendStatus(404));

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

//Default Error Handler
app.use((error, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, error);
  console.log("errorObj from global error catch -> ", errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});
//the frontend dont need to check status code to do conditional rendering, instead they should rely on whether the err property exists in the message sent. 


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
