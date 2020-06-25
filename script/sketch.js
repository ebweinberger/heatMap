let map;
let tweets = [];
let FRAMERATE = 10;
let DOTSIZE = 10;
let SHRINKRATE = .1;
let MAP_PATH = '../assets/map.png';


function preload(){
  map = loadImage(MAP_PATH);
}

function setup(){
  loadImage(MAP_PATH, map => {
    background(map);
  })
  createCanvas(windowWidth, windowHeight);
  frameRate(FRAMERATE);

  // Pusher.logToConsole = true;
  var pusher = new Pusher('e1afc04e9e6d62e414c4', {
    cluster: 'us2'
  });

  var channel = pusher.subscribe('heat-map');

  channel.bind('tweet', function(data){
    let new_tweet = new tweet(data[0], data[1], data[2], Date.now(), DOTSIZE)
    tweets.push(new_tweet);
  })
}

function draw(){
  background(map);
  translate(windowWidth / 2, windowHeight / 2);
  noStroke();
  for (let i = 0; i < tweets.length; i = i + 1){
    var current_tweet = tweets[i]
    var long = (current_tweet.long * windowWidth) / 360;
    var lat = ((current_tweet.lat * -1) * windowHeight) / 180;
    fill(current_tweet.r, current_tweet.g, current_tweet.b)
    circle(long, lat, current_tweet.size)
    text(current_tweet.place, long + 10, lat + 5)
    current_tweet.shrink();
    current_tweet.isSizeZero();
    if(current_tweet.killFlag){
      tweets.splice(i, 1);
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(map);
}

class tweet{
  constructor(long, lat, place, birthTime, size){
    // this.long = (long * windowWidth) / 360;
    // this.lat = ((lat * -1) * windowHeight) / 180;
    this.long = long;
    this.lat = lat;
    this.place = place;
    this.birthTime = birthTime;
    this.r = Math.floor(Math.random() * 255);
    this.g = Math.floor(Math.random() * 255);
    this.b = Math.floor(Math.random() * 255);
    this.size = size;
    this.killFlag = false;
  }

  shrink(){
    this.size = this.size - SHRINKRATE;
  }

  isSizeZero(){
    if (this.size < 0.5){
      this.killFlag = true;
    }
  }
}
