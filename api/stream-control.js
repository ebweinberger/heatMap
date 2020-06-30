const axios = require('axios');
const url = require('url');

module.exports = (req, res) => {
  //Grab the query data from the url
  const query = url.parse(req.url, true).query

  //If the incoming message is "start", post to /start-stream
  if (query.message == "start"){
    axios.post('http://52.14.2.23:3000/start-stream')
    .then((aws_res) => {
      res.status(200).send("Stream started");
      console.log("Stream attempt made!");
    })
    .catch((aws_err) => {
      res.status(500).send("Check server logs for error");
      console.log("Check server logs for error");
    })
  }
  //If the incoming message is "stop", post to /stop-stream
  else if(query.message == "stop"){
    axios.post('http://52.14.2.23:3000/stop-stream')
    .then((aws_res) => {
      res.status(200).send("Stream stopped");
      console.log("Stream stopped");
    }).catch((aws_err) => {
      res.status(500).send("Check server logs for error");
      console.log("Check server logs for error");
    })
  }
  //If the incoming message is "ping", post to /ping
  else if(query.message == "ping"){
    axios.post('http://52.14.2.23:3000/ping')
    .then((aws_res) => {
      res.status(200).send("Pinged");
      console.log("Pinged!");
    }).catch((aws_err) => {
      res.status(500).send("Check server logs for error");
      console.log("Check server logs for error");
    })
  }
}
