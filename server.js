const client = require('socket.io-client');
const io = require('socket.io')();

var stream = client('http://localhost:3005');

const socket = io.on('connection', con => {
  console.log("Client connected" + con);
});
io.listen(3030);


stream.on('coords', coords => {
  console.log(coords);
  socket.emit('data', coords);
})

const path = require('path');
const fs = require('fs');

function handleRequest(req, res) {
  // What did we request?
  let pathname = req.url;

  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  }

  // Ok what's our file extension
  let ext = path.extname(pathname);

  // Map extension to file type
  const typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  // What is it?  Default to plain text
  let contentType = typeExt[ext] || 'text/plain';

  // Now read and write back the file with the appropriate content type
  fs.readFile(__dirname + pathname,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Dynamically setting content type
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}

// HTTP module
let http = require('http');

// Create a server with the handleRequest callback
let server = http.createServer(handleRequest);
// Listen on port 8080
server.listen(3000);

console.log('Server started on port 8080');
