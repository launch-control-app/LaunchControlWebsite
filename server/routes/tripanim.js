/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: GPU accelerated trip animator
 */
const { DataPoint } = require('../config/sequelize');

module.exports = (app) => {
    app.get('/tripanim',
        function(req, res) {
            if (req.query.start !== undefined && req.query.end !== undefined) {
                var userID = req.query.user;
                var startDate = new Date(req.query.start);
                var endDate = new Date(req.query.end);
                DataPoint.findAll({
                    where: {
                        userId: userID,
                        recordedAt: {
                            $between: [startDate, endDate]
                        }
                    },
                    order: [['recordedAt', 'ASC']],
                    attributes: ['geoLat', 'geoLng', 'recordedAt'],
                    raw: true
                }).then(datapoints => {
                    res.json(datapoints);
                });
            }
        }
    );
};