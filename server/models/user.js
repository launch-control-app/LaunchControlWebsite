/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Model class to define a user
 */

// https://github.com/paigen11/mysql-registration-passport/blob/master/api/models/user.js
module.exports = (sequelize, type) => sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: type.STRING,
      allowNull: false,
    },
    vin: {
        type: type.STRING,
        allowNull: false,
    },
    password: {
      type: type.STRING,
      allowNull: false,
    }
});