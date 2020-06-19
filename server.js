const client = require('socket.io-client');
const io = require('socket.io')();
const { spawn } = require('child_process');
// const streamer = fork('./script/stream.js')
const environment = require('dotenv').config();
// const stream = require('./api/stream.js')





const https = require('https');
const request = require('request');
const util = require('util');
// const environment = require('dotenv').config();
// const io = require('socket.io')();
var Pusher = require('pusher');


if(environment.error){
  console.log(environment.error);
  process.exitCode = 1;
}

var pusher = new Pusher({
  appId: '1021239',
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'us2',
  useTLS: true
});

const get = util.promisify(request.get);
const post = util.promisify(request.post);

const consumer_key = process.env.CONSUMER_KEY; // Add your API key here
const consumer_secret = process.env.CONSUMER_SECRET; // Add your API secret key here

const bearerTokenURL = new URL('https://api.twitter.com/oauth2/token');
const streamURL = new URL('https://api.twitter.com/labs/1/tweets/stream/sample');

async function bearerToken (auth) {
  const requestConfig = {
    url: bearerTokenURL,
    auth: {
      user: consumer_key,
      pass: consumer_secret,
    },
    form: {
      grant_type: 'client_credentials',
    },
    headers: {
      'User-Agent': 'TwitterDevSampledStreamQuickStartJS',
    },
  };

  const response = await post(requestConfig);
  return JSON.parse(response.body).access_token;
}

function streamConnect(token) {
  // Listen to the stream
  const config = {
    url: 'https://api.twitter.com/labs/1/tweets/stream/sample?format=detailed&expansions=geo.place_id',
    auth: {
      bearer: token,
    },
    headers: {
      'User-Agent': 'TwitterDevSampledStreamQuickStartJS',
    },
    timeout: 20000,
  };

  const stream = request.get(config);
  console.log

  stream.on('data', data => {
    try {
      const json = JSON.parse(data);
      // console.log(json.includes.places[0].geo.bbox[0])
      // var coords = Plotter.getCoords(json);
      let long = json.includes.places[0].geo.bbox[0];
      let lat = json.includes.places[0].geo.bbox[1];
      let city = json.includes.places[0].full_name;
      let lstCoords = [long, lat, city]
      // process.send({data: lstCoords});
      pusher.trigger('heat-map', 'tweet', lstCoords);
      console.log(lstCoords)
    } catch (e) {
      // Keep alive signal received. Do nothing.
    }
  }).on('error', error => {
    if (error.code === 'ETIMEDOUT') {
      stream.emit('timeout');
    }
  });

  return stream;
}

(async () => {
  let token;

  try {
    // Exchange your credentials for a Bearer token
    token = await bearerToken({consumer_key, consumer_secret});
  } catch (e) {
    console.error(`Could not generate a Bearer token. Please check that your credentials are correct and that the Sampled Stream preview is enabled in your Labs dashboard. (${e})`);
    process.exit(-1);
  }

  const stream = streamConnect(token);
  console.log("Stream attempt made")
  stream.on('timeout', () => {
    // Reconnect on error
    console.warn('A connection error occurred. Reconnecting…');
    streamConnect(token);
  });
})();






// const childStream = spawn('node', ['./script/stream.js']);
// console.log("attemp to spawn");
// childStream.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });
//
// childStream.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });
//
// childStream.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });


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
