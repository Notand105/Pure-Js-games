/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 700;
// esta linea permite obtner la posicion exacta del canvas o de cualquier elemento html, en caso de no utilizarla se dibujan las cosas demasiado desfazadas
const canvasPostion = canvas.getBoundingClientRect();
const explosions = [];

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth / 0.7
    this.height = this.spriteHeight / 0.7;
    this.image = new Image();
    this.image.src = "./assets/boom.png";
    this.frame = 0;
    this.timer = 0
    this.sound = new Audio()
    this.sound.src = './assets/magic_sound.wav'
  }
  update() {
    if (this.frame === 0 ) this.sound.play()
    this.timer++
    this.timer % 10 === 0 ? this.frame++ : null
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x - this.width / 2,
      this.y - this.height/2,
      this.width,
      this.height
      
    );
  }
}

window.addEventListener("click", function (e) {
    createAnimation(e)
});

const createAnimation = (e) =>{
  let positionX = e.x - canvasPostion.left;
  let positionY = e.y - canvasPostion.top;

  explosions.push(new Explosion(positionX, positionY));

}

const animate = () =>{
    ctx.clearRect(0,0,canvas.width, canvas.height)
    explosions.forEach((exp, index) =>{
        exp.update()
        exp.draw()
        // una vez se reproduzca, cuando haya terminado su animacion se eliminará
        if(exp.frame > 5) explosions.splice(index, 1)
    })
    requestAnimationFrame(animate)
}
animate()