const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 对象
Particle = (x, y, radius, color) => {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    c.beginPath();

    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    c.closePath();
} 

init = () => {

}


animate = () => {
    requestAnimationFrame(animate);
}

init();