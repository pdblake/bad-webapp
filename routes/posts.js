const express = require('express');
const router = express.Router();

const { addPost } = require('../db');

router.post('/', function(req, res, next) {
  const { comment } = req.body;
  addPost({username: req.auth.username, admin: req.auth.admin, comment: comment}).then(() => {
    res.redirect('/');
  }).catch((e) => {
    console.error('ERROR', e);
    res.send('Error').end();
  });
});

module.exports = router;
