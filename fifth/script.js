/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.font = '50px Impact'

let timeToNextRaven = 0
let ravenInterval = 500
let lastTime = 0
let score = 0


let ravens = []
class Raven {
  constructor(){
    this.spritewidth = 271
    this.spriteHeight = 194
    this.sizeModifier = Math.random() *0.6 + 0.4
    this.width = this.spritewidth / this.sizeModifier 
    this.height= this.spriteHeight / this.sizeModifier 
    this.x = canvas.width
    this.y = Math.random() * (canvas.height - this.height)
    this.directionX = Math.random() * 5 + 3
    this.directionY = Math.random() * 5 -2.5
    this.markedForDeletion = false
    this.image = new Image()
    this.image.src = './assets/raven.png'
    this.frame = 0
    this.maxFrame =4
    this.timeSinceFlap = 0
    this.flapInterval = Math.random() * 50 + 50
  }
  update(deltatime){
    if(this.y < 0 || this.y > canvas.height - this.height) this.directionY *= -1
    this.x -= this.directionX
    this.y += this.directionY
    if(this.x < 0-this.width) this.markedForDeletion = true
    this.timeSinceFlap += deltatime
    
    if (this.timeSinceFlap > this.flapInterval){
      if (this.frame > this.maxFrame) this.frame = 0
      else this.frame++
      this.timeSinceFlap = 0
    }


  }
  draw(){
    ctx.drawImage(this.image, this.frame * this.spritewidth,0,this.spritewidth, this.spriteHeight, this.x, this.y,this.width, this.height)
  }
}

const raven = new Raven()

const drawScore = () =>{
  ctx.fillStyle = 'black'
  ctx.fillText('Score: ' + score, 50, 75)

  ctx.fillStyle = 'white'
  ctx.fillText('Score: ' + score, 55, 80)
}

window.addEventListener('click', (e) => {
  const detectPixelColor = ctx.getImageData(e.x, e.y, 1,1)
  console.log(detectPixelColor)
})

const animate= (timestamp) =>{
 
  ctx.clearRect(0,0,canvas.width, canvas.height)
  let deltatime = timestamp - lastTime
  lastTime  = timestamp
  timeToNextRaven += deltatime
  if (timeToNextRaven > ravenInterval){
    ravens.push(new Raven())
    timeToNextRaven = 0
  }
  drawScore();
  [...ravens].forEach((object)=> {
    object.update(deltatime)
    object.draw()
  })
  
  
  ravens = ravens.filter(object => !object.markedForDeletion)
  requestAnimationFrame(animate)
}

animate(0)