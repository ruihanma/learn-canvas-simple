const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

addEventListener("mousemove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize", event => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

// 数值随机方法
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let colors = ["#282c37", "#9baec8", "#d9e1e8", "#2b90d9"];

// 随机颜色方法
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// 粒子
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  // 弧度 这里在圆的直径范围内
  this.radians = Math.random() * Math.PI;
  // 速率
  this.velocity = 0.08;

  this.distanceFromCenter = randomIntFromRange(70, 150);

  this.lastMouse = {x, y};

  this.update = () => {
    const lastPonit = { x: this.x, y: this.y };
    this.radians += this.velocity;


    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPonit);
  };

  this.draw = lastPonit => {
    c.beginPath();
    // 画圆
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = this.color;
    // c.fill();
    // 画线
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPonit.x, lastPonit.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  };
}

let particles;
function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 2 + 1;
    particles.push(new Particle(300, 300, radius, randomColor(colors)));
  }

  //   console.log("particles", particles);
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255,255,255, 0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  //   c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
  });
}

init();
animate();
