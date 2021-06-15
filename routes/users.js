const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { getUser } = require('../db');

const TOKEN_SECRET = 'billy5';

function generateAccessToken(user) {
  const fullObj = {
    ...user,
    loggedIn: true,
  };
  return jwt.sign(fullObj, TOKEN_SECRET, { expiresIn: '1800s' });
}

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Log in', error: '' });
});

router.get('/logout', function(req, res, next) {
  res.cookie('ACCESS_TOKEN','', { maxAge: 900000, httpOnly: false });
  res.redirect('/');
});

router.post('/login', function(req, res, next) {
  const { user, password } = req.body;

  getUser(user, password).then(user => {
    if (user === null) {
      res.render('login', { error: 'Access denied', title: 'Log in' });
    } else {
      const accessToken = generateAccessToken(user);
      res.cookie('ACCESS_TOKEN',accessToken, { maxAge: 900000, httpOnly: false });
      res.redirect('/');
    }
  }).catch(error => {
    res.send('Error retrieving user').end();
  });
});

module.exports = router;
