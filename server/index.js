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
    console.log('authenticated!');
    socket.on('data', function(data){
        console.log(data);
        io.emit('data', data);
    });
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('data', function(data){
//       console.log(data);
//       io.emit('data', data);
//   });
// });

require('./routes/signup')(app);
require('./routes/login')(app);
  
http.listen(port);

console.log('Launch Control is active on port ' + port);