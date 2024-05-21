var express = require('express');
var router = express.Router();

/* GET users listing. */
var User = require('../models/user');
var bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');

var auth = require('../authenticate.js')();
var jwt = require('jwt-simple');
var jsonWt = require('jsonwebtoken');
var cfg = require('../config.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

router.use(bodyParser.json());

router.route('/signup')
  .post((req, res, next) => {
    console.log('hello', req.body.password);

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else if (hash) {
        console.log('Gjood', hash);
        const user = new User();
        user.username = req.body.username;
        user.emailid = req.body.emailid;
        user.password = hash;
        user.save()
          .then((user) => {
            console.log('what is this', user);
            var payload = {
              _id: user._id
            };
            var token = getToken(payload);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, token: token, user: user._id, status: 'Registration Successful!' });

          })
          .catch(err => res.status(400).send(err));
      }
    });
  });


router.get('/login', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: "Login Unsuccessful!", err: info });
    }

    console.log('login to user', user);
    req.logIn(user, (err) => {
      if (err == null) {
        res.statusCode = 401;
        res.setHeader('Content-Type', "application/json");
        res.json({ success: false, status: 'Login Unsuccessful!', errmess: err, err: 'Could not Login user' });
      }
      else {
        var payload = {
          _id: user._id
        };
        var token = getToken(payload);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, token: token, session: req.session, status: 'You are successfully logged in!' });

      }
    });
  })(req, res, next);
});

module.exports = router;

const getToken = function (user) {
  return jsonWt.sign(user, cfg.jwtSecret,
    { expiresIn: 3600 });
};