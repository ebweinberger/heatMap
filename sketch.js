let socket;

function setup(){
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://localhost:3030')

  socket.on('data',
  function(coords){
    let str = coords[0] + ", " + coords[1];
    fill(0, 0, 255);
    let x = coords[1] + 180;
    let y = coords[0] + 90;
    let norm_x = (x * windowWidth) / 360;
    let norm_y = (y * windowHeight) / 360;
    circle(norm_x, norm_y, 10);
    text(str, norm_x - 50, norm_y - 15);
  })
}

function draw(){

}
