/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Passport js lib to handle authorization
 */
const bcrypt = require('bcrypt');
const jwtSecret = require('./jwtConfig');
const User = require('./sequelize');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const BCRYPT_SALT_ROUNDS = 14;

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, email, password, done) => {
      try {
        User.findOne({
          where: {
            email: email,
          },
        }).then((user) => {
          if (user != null) {
            return done(null, false, {
              message: 'Account already exists!',
            });
          }
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
            User.create({
              email: email,
              password: hashedPassword,
              vin: req.body.vin,
            }).then((user) => {
              return done(null, user);
            });
          });
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            email: username,
          },
        }).then((user) => {
          if (user === null) {
            return done(null, false, { message: 'invalid credentials' });
          }
          bcrypt.compare(password, user.password).then((response) => {
            if (response !== true) {
              console.log('passwords do not match');
              return done(null, false, { message: 'invalid credentials' });
            }
            console.log('user found & authenticated');
            return done(null, user);
          });
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use('jwt', new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          id: jwt_payload.id,
        },
      }).then((user) => {
        if (user) {
          console.log('user found in db in passport');
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);