const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES

app.use(morgan('dev'));
app.use(express.json());

// global route handler middleware are before route handlers
app.use((req, res, next) => {
  console.log('Hello from the middleware.');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 1) ROUTE HANDLERS

// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// 4) START SERVER

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
