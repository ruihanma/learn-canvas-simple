const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
let count = 5;

init = () => {
  for (let i = 0; i < count; i++) {
    let x = Math.random() * canvas.width,
      y = Math.random() * canvas.height,
      radius = 200,
      color = "#333";
    particles.push(new Particle(x, y, radius, color));
  }

  console.log("particles", particles);
};

animate = () => {
  requestAnimationFrame(animate);
  particles.forEach(particle => {
    particle.update();
  });
};

init();
animate();
