//permite a vscode hacer sugerencias respecto a trabajar con canvas
/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");

const CANVAS_WIDHT = (canvas.width = 500);
const CANVAS_HEGIHT = (canvas.height = 1000);

const numberOfEnemies = 10;
const enemies = [];

const enemiesSize = [
  {
    id: 1,
    x: 293,
    y: 155,
  },
  {
    id: 2,
    x: 266,
    y: 188,
  },
  {
    id: 3,
    x: 218,
    y: 177,
  },
];

let gameFrame = 0;
class Enemy {
  constructor(x, y, width, height, imageSrc) {
    this.enemyImage = new Image();
    this.enemyImage.src = imageSrc;
    this.speed = Math.random() * 7.5 + 1;
    this.spriteWidht = enemiesSize[2].x;
    this.spriteHeight = enemiesSize[2].y;
    this.width = this.spriteWidht / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.x = Math.random() * (CANVAS_WIDHT - this.width);
    this.y = Math.random() * (CANVAS_HEGIHT - this.height);
    this.angle = 0;
    this.angleSpeed = Math.random() * 2 + 0.5;
    // this.curve = Math.random() * 200 + 50;
  }

  update() {
    this.x =
      canvas.width/2 * Math.cos((this.angle * Math.PI) / 180) +
      canvas.width / 2 -
      this.width / 2;
    this.y =
      canvas.height/2 * Math.sin((this.angle * Math.PI) / 90) +
      canvas.height/ 2 -
      this.height / 2;
    // this.y += this.curve * Math.sin(this.angle)
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = canvas.width;
    if (gameFrame % this.flapSpeed == 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    ctx.drawImage(
      this.enemyImage,
      this.frame * this.spriteWidht,
      0,
      this.spriteWidht,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

// const enemy1 = new Enemy(10,10,100,200)

for (let i = 0; i < numberOfEnemies; i++) {
  enemies.push(
    new Enemy(
      Math.random() * CANVAS_WIDHT,
      Math.random() * CANVAS_HEGIHT,
      100,
      100,
      "./assets/enemy3.png"
    )
  );
}

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDHT, CANVAS_HEGIHT);

  enemies.forEach((enemie) => {
    enemie.update();
    enemie.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
};

animate();
