const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c.fillStyle = "#333";
// c.fillRect(0, 0, canvas.width, canvas.height);

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// 构建页面对象
function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.update = function() {
    this.draw();
  };

  this.draw = function() {
    c.beginPath();

    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    c.fillStyle = this.color;
    c.fill();

    c.closePath();
  };
}

let circle1, circle2;

// 初始化方法 用于元素堆砌
function init() {
  circle1 = new Circle(canvas.width / 2, canvas.height / 2, 100, "black");
  circle2 = new Circle(undefined, undefined, 20, "red");
}

// 播放方法
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  circle1.update();

  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();
}

init();
animate();
