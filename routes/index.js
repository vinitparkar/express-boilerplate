const express = require('express');
const router = express.Router();
const seed = require('../seed');

module.exports = function(io) {
  router.get('/', function(req, res) {
    let tweets = seed.list();

    res.render('index', {title: 'Twitter.js', tweets: tweets, showForm: true});
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var tweets = seed.find({name: name});

    res.render('index', {title: 'Twitter.js', tweets: tweets, showForm: true, value: name});
  });

  router.get('/tweets/:id', function(req, res) {
    var id = Number(req.params.id);
    var tweets = seed.find({id: id});

    res.render('index', {title: 'Twitter.js', tweets: tweets});
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;

    seed.add(name, text);

    var tweet = seed.find({name: name, content: text})[0];

    io.sockets.emit('newTweet', tweet);

    res.redirect('/');
  });

  return router;
};
