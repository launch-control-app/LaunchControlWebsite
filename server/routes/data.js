/* Creation Date: Saturday, March 30th 2019
 * Original Author: Nathan
 * Contents of file: Handle getting data requests
 */

const passport = require('passport');
const { DataPoint } = require('../config/sequelize');

module.exports = (app) => {
    app.get('/data',
        passport.authenticate('jwt', {session: false}),
        function(req, res) {
            if (req.query.start !== undefined && req.query.end !== undefined) {
                var startDate = new Date(req.query.start);
                var endDate = new Date(req.query.end);
                DataPoint.findAll({
                    where: {
                        userId: req.user.id,
                        recordedAt: {
                            $between: [startDate, endDate]
                        }
                    },
                    order: [['recordedAt', 'ASC']],
                    raw: true
                }).then(datapoints => {
                    res.json(datapoints);
                });
            } else {
                DataPoint.findAll({
                    where: {
                        userId: req.user.id
                    },
                    order: [['recordedAt', 'ASC']],
                    raw: true
                }).then(datapoints => {
                    res.json(datapoints);
                });
            }
        }
    );
};