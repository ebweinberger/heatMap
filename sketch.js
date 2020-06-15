let socket;

function setup(){
  loadImage('./map.jpg', map => {
    background(map);
  })
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://localhost:3030')

  socket.on('data',
  function(coords){
    let randR = Math.floor(Math.random() * 255);
    let randG = Math.floor(Math.random() * 255);
    let randB = Math.floor(Math.random() * 255);
    fill(randR, randG, randB);
    let x = coords[0];
    let y = coords[1] * -1;
    translate(windowWidth / 2, windowHeight / 2);
    let norm_x = (x * windowWidth) / 360;
    let norm_y = ((y * windowHeight) / 180);
    circle(norm_x, norm_y, 10);
    // let str = x + ", " + y;
    let str = coords[2];
    text(str, norm_x - 50, norm_y - 15);
  })
}

function draw(){

}
