const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// 设置画布大小
canvas.width = innerWidth;
canvas.height = innerHeight;

// 范围方法函数
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 点方法
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  // 速度
  this.velocity = {
    x: Math.random() - 0.5,
    y: Math.random() - 0.5
  };

  this.update = () => {
    this.draw();

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
      this.velocity.x = -this.velocity.x;

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
      this.velocity.y = -this.velocity.y;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };

  this.draw = () => {
    c.beginPath();

    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();

    c.closePath();
  };
}

let particles,
  radius = 100,
  count = 4;

// 初始化方法
function init() {
  particles = [];
  // 初始的位置放在init
  for (let i = 0; i < count; i++) {
    particles.push(
      new Particle(
        randomRange(radius, innerWidth - radius),
        randomRange(radius, innerHeight - radius),
        radius,
        "blue"
      )
    );
  }
}

// 动画方法
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(el => {
    el.update();
  });
}

init();

animate();
