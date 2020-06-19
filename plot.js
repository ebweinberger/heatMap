
var Plotter = module.exports = function Plotter(){
  this.long = 0;
  this.lat = 0;
  return this;
}

Plotter.prototype.getCoords = function getCoords(tweet){
  if(tweet.includes.places[0].geo.bbox){
    this.long = tweet.includes.places[0].geo.bbox[0];
    this.lat = tweet.includes.places[0].geo.bbox[1];

    var result = [this.lat, this.long];
  }else{
    return "No location";
  }

  return result;
}
