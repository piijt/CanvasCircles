var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// for (let i = 0; i < 25; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//
//   c.beginPath();
//   c.arc(x,y,30,0, Math.PI * 2, false);
//   c.strokeStyle = "black";
//   c.stroke();
// }
// console.log(canvas);

var mouse = {
  x: undefined,
  y: undefined
}

let maxRadius = 40;
// colors powered by kuler https://color.adobe.com/da/explore
var colorArray = [
  '#F29C50',
  '#F27F3D',
  '#F20505',
  '#A60303',
  '#0D0D0D'
];

window.addEventListener('mousemove',
  function(e){
  // console.log(e);
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

 function Circle(x, y, dx, dy, radius) { // 5 arg
    this.x = x;
    this.y = y;
    this.dx = dx; // velocity
    this.dy = dy; // velocity
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
    }

    this.update = function() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) { // reverse velocity from left & right hand side
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity

        if (mouse.x - this.x < 50
            && mouse.x - this.x > -50
            && mouse.y - this.y < 50
            && mouse.y - this.y > - 50) {
          if (this.radius < maxRadius) {
            this.radius ++;
          }
        } else if (this.radius > this.minRadius) {
          this.radius --;
        }

        this.draw();

    }
}


// console.log(circleArray);
let circleArray = [];

function init() {

  circleArray = [];
  // for loop that controls how many circles there is and store them in the circle array
  for (let i = 0; i < 2000; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - .5); // x velocity
    let dy = (Math.random() - .5); // y velocity
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
}

animate();
init();
