const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 数值随机方法
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 获取两点之间的距离
function getDistance(x1, y1, x2, y2) {
  let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 2);
  return d;
}

// 对象
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.update = () => {
    this.draw();
  };

  this.draw = () => {
    c.beginPath();

    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = this.color;
    // c.fill();
    c.strokeStyle = this.color;
    c.stroke();

    c.closePath();
  };
}

let particles = [];
let count = 4;

init = () => {
  for (let i = 0; i < count; i++) {
    let radius = 100,
      x = randomIntFromRange(radius, innerWidth - radius),
      y = randomIntFromRange(radius, innerHeight - radius),
      color = "#333";

    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (
          getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 <
          0
        ) {
          (x = randomIntFromRange(radius, innerWidth - radius)),
            (y = randomIntFromRange(radius, innerHeight - radius)),
            (j = -1);
        }
      }
    }

    particles.push(new Particle(x, y, radius, color));
  }
};

animate = () => {
  requestAnimationFrame(animate);
  particles.forEach(particle => {
    particle.update();
  });
};

init();
animate();
