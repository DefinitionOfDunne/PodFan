var passport = require('passport');
var User = require('../models/user');
var router = require('express').Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome PodFan!' });
});

router.get('/home', function(req, res) {
  res.render('home', { user: req.user });
});

router.get('/favorites', function(req, res) {
  res.render('favorites', { user: req.user });
  console.log(req.user);
});

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  User.register(new User({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.render('login', {user: req.user, error: req.flash('error')});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
