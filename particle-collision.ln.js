const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// 设置画布大小
canvas.width = innerWidth;
canvas.height = innerHeight;

// 随机数范围方法函数
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// 获取两点间距离方法
function calculateDistance(x1, y1, x2, y2) {
  let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 2);
  return d;
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

  this.update = particles => {
    this.draw();

    // // 触壁反弹 触壁后将对应轴速率反值
    // if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
    //   this.velocity.x = -this.velocity.x;

    // if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
    //   this.velocity.y = -this.velocity.y;

    // this.x += this.velocity.x;
    // this.y += this.velocity.y;
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

  // 初始化原点位置不重合
  for (let i = 0; i < count; i++) {
    let x = randomRange(radius, innerWidth - radius),
      y = randomRange(radius, innerHeight - radius);

    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        let d = calculateDistance(particles[j].x, particles[j].y, x, y);
        if (d < radius * 2) {
          x = randomRange(radius, innerWidth - radius);
          y = randomRange(radius, innerHeight - radius);
          j = -1; // 重新循环计算位置 直到取到合适的位置
        }
      }
    }

    particles.push(new Particle(x, y, radius, "blue"));
  }
}

// 动画方法
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(el => {
    el.update(particles);
  });
}

init();

animate();
