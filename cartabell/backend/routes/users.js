var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  // take data from submitted form, create new Mongoose model instance
  let user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function(err) { // save record, generate JWT and send inside JSON response
    if (err) {
      return next(err);
    }
    return res.json({ token: user.generateJWT() });
  });
});

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) { // Passport throws error
      return next(err);
    }
    if (user) { // user is found
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/checkusername', function(req, res, next) {
  User.find({username: req.body.username}, 
    function(err, result) {
      if (result.length) {
        res.json({'username': 'alreadyexists'}) // return json object saying if username…
      } else {
        res.json({'username': 'ok'}) // …already exists or not!
      }
  });
});

module.exports = router;