const fs = require('fs');
const express = require('express');
const router = express.Router();

const { getPosts } = require('../db');

router.get(['/img/(.*)', '/img/:file'], function(req, res, next) {
  const realFile = 'public/images/' + (req.params.file || req.params[0]);
  const stream = fs.createReadStream(realFile);
  stream.on('error', err => {
    res.send('Error').end();
  });
  stream.pipe(res);
});

router.get('/', function(req, res, next) {
  getPosts().then(posts => {
    res.render('index', { title: 'Guest book', auth: req.auth, posts });
  });
});



module.exports = router;
