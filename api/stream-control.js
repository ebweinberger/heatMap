const axios = require('axios');
const url = require('url');

module.exports = (req, res) => {
  const query = url.parse(req.url, true).query

  if (query.message == "start"){
    axios.post('http://52.14.2.23:3000/start-stream')
    .then((aws_res) => {
      res.status(200).json(aws_res);
      console.log(aws_res);
    })
    .catch((aws_err) => {
      res.status(501).send(aws_err);
      console.log(aws_err);
    })
  }else if(query.message == "stop"){
    axios.post('http://52.14.2.23:3000/stop-stream')
    .then((aws_res) => {
      res.status(200).send(JSON.parse(aws_res).message);
      console.log(aws_res.toString());
    }).catch((aws_err) => {
      res.status(501).send(aws_err);
      console.log(aws_err);
    })
  }else if(query.message == "ping"){
    axios.post('http://52.14.2.23:3000/ping')
    .then((aws_res) => {
      res.status(200).json(aws_res);
      console.log(aws_res);
    }).catch((aws_err) => {
      res.status(501).send(aws_err);
      console.log(aws_err);
    })
  }
}
