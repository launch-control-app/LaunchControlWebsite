/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Handle login authentication
 */

const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig');
const passport = require('passport');
const User = require('../config/sequelize');

module.exports = (app) => {
    app.post('/login', (req, res, next) => {
      passport.authenticate('login', (err, user, info) => {
        if (err) {
          console.error(`error ${err}`);
        }
        if (info !== undefined) {
          console.error(info.message);
          if (info.message === 'bad username') {
            res.status(401).send(info.message);
          } else {
            res.status(403).send(info.message);
          }
        } else {
          req.logIn(user, () => {
            User.findOne({
              where: {
                email: req.body.email,
              },
            }).then((user) => {
              const token = jwt.sign({ id: user.id }, jwtSecret.secret);
              res.status(200).send({
                token,
              });
            });
          });
        }
      })(req, res, next);
    });
  };