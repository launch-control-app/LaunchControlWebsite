/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Handle postgre sql connection
 */
const Sequelize = require('sequelize');
const UserModel = require('../models/user');

var env = process.env.NODE_ENV || 'dev';

// https://stackoverflow.com/questions/27687546/cant-connect-to-heroku-postgresql-database-from-local-node-app-with-sequelize
const sequelize = (() => {
    if (env == 'dev')
        return new Sequelize('sqlite:dev.db')
    else
        return new Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: true
            }
        });
})();

console.log()

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
    console.log('Tables updated');
});

module.exports = User;
