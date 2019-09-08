const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// 设置画布大小
canvas.width = innerWidth;
canvas.height = innerHeight;

// 点方法
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  

  this.update = () => {
      this.draw();
  }

  this.draw = () => {
      
      c.beginPath();
    
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = this.color;
      c.stroke();
    
      c.closePath();
  }

}

let particle;

// 初始化方法
function init() {
  particle = new Particle(innerWidth / 2, innerHeight / 2, 100, "blue");

}

// 动画方法ßßßß
function animate() {
  requestAnimationFrame(animate);

    particle.update();
}

init();

animate();