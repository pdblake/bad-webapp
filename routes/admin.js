const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.auth.admin) {
    res.send('Access denied').end();
    return;
  }
  res.render('admin', { title: 'Admin console'});
});

module.exports = router;
