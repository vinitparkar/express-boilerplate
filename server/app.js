const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'node_modules')));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
