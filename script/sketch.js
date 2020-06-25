//General setup
let map;
let tweets = [];
let FRAMERATE = 30;
let MAP_PATH = '../assets/map.png';

//Dot color and size settings
let TRANSPERENCY = .75;
let RANDOM_MAX = 255;
let RANDOM_MIN = 0;
let DOTSIZE = 10;

//Rates of change
let COLOR_SHIFT = 1;
let SHRINKRATE = .05;



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
    fill(rgba_string(current_tweet.r, current_tweet.g, current_tweet.b));
    circle(long, lat, current_tweet.size)
    // text(current_tweet.place, long + 10, lat + 5)
    // current_tweet.shrink();
    // current_tweet.isSizeZero();
    current_tweet.shiftColor();
    current_tweet.isRed();
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
    // this.r = getRandomInt(RANDOM_MIN, RANDOM_MAX);
    // this.g = getRandomInt(RANDOM_MIN, RANDOM_MAX);
    // this.b = getRandomInt(RANDOM_MIN, RANDOM_MAX);
    this.r = 0;
    this.g = 0;
    this.b = 255;
    this.size = size;
    this.killFlag = false;
  }

  shrink(){
    this.size = this.size - SHRINKRATE;
  }

  shiftColor(){
    this.r = this.r + COLOR_SHIFT;
    this.b = this.b - COLOR_SHIFT
  }

  isSizeZero(){
    if (this.size < 0.5){
      this.killFlag = true;
    }
  }

  isRed(){
    if (this.r > 245){
      this.killFlag = true;
    }
  }
}

function rgba_string(r, g, b){
  let str = "rgba(" + r + ", " + g + ", " + b + ", " + TRANSPERENCY + ")";
  return str;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
