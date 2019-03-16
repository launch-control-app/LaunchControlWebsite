/* Creation Date: Saturday, March 16th 2019
 * Original Author: Nathan
 * Contents of file: Model class to define a data point
 */

module.exports = (sequelize, type, user) => sequelize.define('datapoint', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vin: {
        type: type.STRING,
        allowNull: false,
    },
    rawMessage: {
        type: type.STRING,
        allowNull: false,
    },
    rpm: {
        type: type.INTEGER,
        allowNull: false,
    },
    absoluteEngineLoad: {
        type: type.INTEGER,
        allowNull: false,
    },
    ambientTemperature: {
        type: type.INTEGER,
        allowNull: false,
    },
    barometricPressure: {
        type: type.INTEGER,
        allowNull: false,
    },
    calculatedEngineLoad: {
        type: type.INTEGER,
        allowNull: false,
    },
    controlModuleVoltage: {
        type: type.INTEGER,
        allowNull: false,
    },
    engineCoolantTemperature: {
        type: type.INTEGER,
        allowNull: false,
    },
    engineOilTemperature: {
        type: type.INTEGER,
        allowNull: false,
    },
    engineRunningTime: {
        type: type.INTEGER,
        allowNull: false,
    },
    flowPressure: {
        type: type.INTEGER,
        allowNull: false,
    },
    fuelLevel: {
        type: type.INTEGER,
        allowNull: false,
    },
    intakePressure: {
        type: type.INTEGER,
        allowNull: false,
    },
    intakeTemperature: {
        type: type.INTEGER,
        allowNull: false,
    },
    referenceTorque: {
        type: type.INTEGER,
        allowNull: false,
    },
    throttlePosition: {
        type: type.INTEGER,
        allowNull: false,
    },
    torquePercentage: {
        type: type.INTEGER,
        allowNull: false,
    },
    vehicleRunningDistance: {
        type: type.INTEGER,
        allowNull: false,
    },
    vehicleSpeed: {
        type: type.INTEGER,
        allowNull: false,
    },
    geoLat: {
        type: type.FLOAT,
        allowNull: false,
    },
    geoLng: {
        type: type.FLOAT,
        allowNull: false,
    },
    recordedAt: type.DATE,
    createdAt: type.DATE,
    updatedAt: type.DATE,
}).belongsTo(user);