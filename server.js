const io = require('socket.io-client');

var stream = io('http://localhost:3005');

stream.on('coords', coords => {
  console.log(coords);
})
