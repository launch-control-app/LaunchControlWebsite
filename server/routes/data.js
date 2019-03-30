/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Handle getting data requests
 */

const passport = require('passport');
const { DataPoint } = require('../config/sequelize');

module.exports = (app) => {
    app.get('/data',
        passport.authenticate('jwt', {session: false}),
        function(req, res) {
        res.json({ id: req.user.id, email: req.user.email });
    });
};