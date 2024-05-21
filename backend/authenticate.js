var passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken'); //used to create, sign and verify tokens
var config = require('./config.js');
var User = require('./models/user');


var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = () => {
    passport.use(new JwtStrategy(opts,
        (jwt_payload, done) => {
            console.log("jwt payload",jwt_payload);
            User.findOne({ _id: jwt_payload._id }).exec()
            .then((user) => {
                if (!user) {
                    return done(new Error('user not found'), false);
                }
                else if (user) {
                    return done(null, user);
                }

                return done(null, false);
            });
        }
    ))

    passport.use(new LocalStrategy(
        (username, password, done) => {
            console.log("Checking", username, password);

            User.findOne({ username: username }).exec()
                .then(user => {
                    console.log("cheese", user);
                    if (!user) {
                        return done(err);
                    }
                    else if (!user.validPassword(password)) {
                        console.log("cheese22", user);
                        return done(null, user);
                    }

                    return done(null, user);
                })
        }
    ))

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", config.jwtSession);
        },
        verifyUser: () => {
            return passport.authenticate("local", config.jwtSession);
        }
    }
}

