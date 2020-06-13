
var Plotter = module.exports = function Plotter(){
  this.long = 0;
  this.lat = 0;
  return this;
}

Plotter.prototype.getCoords = function getCoords(tweet){
  // if(tweet.coordinates){
  //   this.long = tweet.coordinates.coordinates[0];
  //   this.lat = tweet.coordinates.coordinates[1];
  // }

  return tweet.data.coordinates;

}
