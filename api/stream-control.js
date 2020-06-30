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
      res.status(200).send("Stream stopped");
      console.log(JSON.stringify(aws_err, censor(aws_err)));
    }).catch((aws_err) => {
      res.status(501).send(aws_err);
      console.log(JSON.stringify(aws_err, censor(aws_err)));
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

function censor(censor) {
  var i = 0;

  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value)
      return '[Circular]';

    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';

    ++i; // so we know we aren't using the original object anymore

    return value;
  }
}
