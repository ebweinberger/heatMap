const client = require('socket.io-client');
const io = require('socket.io')();
const { spawn } = require('child_process');
// const streamer = fork('./script/stream.js')
const environment = require('dotenv').config();

const childStream = spawn('node', ['./script/stream.js'])
childStream.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

childStream.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

childStream.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});


// streamer.on('message', message => {
//   console.log(message.data);
// });

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

console.log('Server started on port 3000');
