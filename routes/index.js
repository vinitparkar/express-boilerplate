const express = require('express');
const router = express.Router();
const people = require('../seed');

router.get('/', function(req, res) {
  res.render('index', {title: 'Hall of Fame', people: people});
});

module.exports = router;
