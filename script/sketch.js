let socket;

function setup(){
  loadImage('../assets/map.jpg', map => {
    background(map);
  })
  createCanvas(windowWidth, windowHeight);

  Pusher.logToConsole = true;
  var pusher = new Pusher('e1afc04e9e6d62e414c4', {
    cluster: 'us2'
  });

  var channel = pusher.subscribe('heat-map');
  channel.bind('tweet', function(data){
    let randR = Math.floor(Math.random() * 255);
    let randG = Math.floor(Math.random() * 255);
    let randB = Math.floor(Math.random() * 255);
    fill(randR, randG, randB);
    let x = data[0];
    let y = data[1] * -1;
    translate(windowWidth / 2, windowHeight / 2);
    let norm_x = (x * windowWidth) / 360;
    let norm_y = ((y * windowHeight) / 180);
    circle(norm_x, norm_y, 10);
    // let str = x + ", " + y;
    let str = data[2];
    text(str, norm_x - 50, norm_y - 15);
  })
}

function draw(){

}
