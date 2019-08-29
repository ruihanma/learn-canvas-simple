import dat from "dat.gui";

const gui = new dat.GUI();
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequenty: 0.01
};

// hsla h:Hue 色光圆谱 0红 120绿 240蓝
// - s Saturation饱和度 0%是灰度 100%是全色
// - l Lightness亮度 0%是黑色 100%是白色
// - a Alpha 透明度 0是透明 1是不透明
const colorStrke = {
  h: 200,
  s: 100,
  l: 50,
  a: 1
};

const colorBg = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01
};

// GUI config
const waveFolder = gui.addFolder("wave");
waveFolder.add(wave, "y", 0, canvas.height);
waveFolder.add(wave, "length", -0.01, 0.01);
waveFolder.add(wave, "amplitude", -300, 300);
waveFolder.add(wave, "frequenty", -0.01, 1);
waveFolder.open();

const colorStrokeFolder = gui.addFolder("color stroke");
colorStrokeFolder.add(colorStrke, "h", 0, 360);
colorStrokeFolder.add(colorStrke, "s", 0, 100);
colorStrokeFolder.add(colorStrke, "l", 0, 100);
colorStrokeFolder.add(colorStrke, "a", 0, 1);
colorStrokeFolder.open();

const colorBgFolder = gui.addFolder("color background");
colorBgFolder.add(colorBg, "r", 0, 255);
colorBgFolder.add(colorBg, "g", 0, 255);
colorBgFolder.add(colorBg, "b", 0, 255);
colorBgFolder.add(colorBg, "a", 0, 1);
colorBgFolder.open();


let increment = wave.frequenty;
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(${colorBg.r}, ${colorBg.g}, ${colorBg.b}, ${colorBg.a})`;
  c.fillRect(0, 0, canvas.width, canvas.height);
  // c.clearRect(0, 0, canvas.width, canvas.height);

  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(
      i,
      wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment)
    );
  }

  // console.log(Math.abs(colorStrke.h * Math.sin(increment)))
  c.strokeStyle = `hsla(${Math.abs(colorStrke.h * Math.sin(increment))}, ${colorStrke.s}%, ${colorStrke.l}%, ${colorStrke.a})`;
  c.stroke();

  increment += wave.frequenty;
}

animate();
