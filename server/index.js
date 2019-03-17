/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Starting point of the backend server
 */

const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const jwtSecret = require('./config/jwtConfig');
const { DataPoint } = require('./config/sequelize');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketioJwt = require("socketio-jwt");
var passport = require('passport');


const port = process.env.PORT || 4000;

require('./config/passport');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
 
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

//Load home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'../frontend/build/index.html'));
});

// https://stackoverflow.com/questions/24058157/socket-io-node-js-cross-origin-request-blocked
io.set('origins', '*:*');

io.sockets
  .on('connection', socketioJwt.authorize({
    secret: jwtSecret.secret,
    timeout: 10000 // 10 second timeout
  })).on('authenticated', function(socket) {
    console.log('authenticated with user id ' + socket.decoded_token.id + '!');
    socket.join(socket.decoded_token.id);
    socket.on('data', function(data){
        console.log('[' + socket.decoded_token.id + ']', data);
        io.to(socket.decoded_token.id).emit('data', data);
        try {
          DataPoint.create({
            user: socket.decoded_token.id,
            vin: data.VIN,
            rawMessage: data.rawMessage,
            rpm: data.RPM,
            absoluteEngineLoad: data.absoluteEngineLoad,
            ambientTemperature: data.ambientTemperature,
            barometricPressure: data.barometricPressure,
            calculatedEngineLoad: data.calculatedEngineLoad,
            controlModuleVoltage: data.controlModuleVoltage,
            engineCoolantTemperature: data.engineCoolantTemperature,
            engineOilTemperature: data.engineOilTemperature,
            engineRunningTime: data.engineRunningTime,
            flowPressure: data.flowPressure,
            fuelLevel: data.fuelLevel,
            intakePressure: data.intakePressure,
            intakeTemperature: data.intakeTemperature,
            referenceTorque: data.referenceTorque,
            throttlePosition: data.throttlePosition,
            torquePercentage: data.torquePercentage,
            vehicleRunningDistance: data.vehicleRunningDistance,
            vehicleSpeed: data.vehicleSpeed,
            geoLat: data["latLng"].latitude,
            geoLng: data["latLng"].longitude,
            recordedAt: data.dateTimeStamp,
          })
        } catch (error) {
          console.log(error)
        }
    });
});

require('./routes/signup')(app);
require('./routes/login')(app);
  
http.listen(port);

console.log('Launch Control is active on port ' + port);