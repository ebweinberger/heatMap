const https = require('https');
const request = require('request');
const util = require('util');
const environment = require('dotenv').config();
const io = require('socket.io')();
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
