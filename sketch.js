let socket;

function setup(){
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://localhost:3030')

  socket.on('data',
  function(coords){
    let str = coords[0] + ", " + coords[1];
    text(str, 10, 10);
    fill(0, 0, 255);
    circle(coords[0], coords[1], 10);
  })
}

function draw(){

}
