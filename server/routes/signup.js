/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Handle signup authentication
 */

const passport = require('passport');
const { User } = require('../config/sequelize');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig');


module.exports = app => {
    app.post('/signup', (req, res, next) => {
      passport.authenticate('signup', (err, user, info) => {
        if (err) {
          console.error(err);
        }
        if (info !== undefined) {
          console.error(info.message);
          res.status(403).send(info.message);
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