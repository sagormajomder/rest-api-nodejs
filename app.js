const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// User Router
app.use('/api/v1/users', userRouter);

// Home Route
app.get('/', (req, res) => {
  res.status(200).send(`<h1>This is Home route</h1>`);
});

// 404 route
app.use((req, res, next) => {
  res.status(404).json({
    result: 'Error',
    message: '404 - page not found',
  });
});

// Server Error
app.use((err, req, res, next) => {
  res.status(500).json({
    result: 'Error',
    message: 'Something broke ' + err.message,
  });
});

module.exports = app;
