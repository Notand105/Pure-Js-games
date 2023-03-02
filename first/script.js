import { animationState } from "./spriteAnimation.js"

let animation = 'idle'

//obtenemos el valor de el elemento select 
const dropdown = document.getElementById('animations')
dropdown.addEventListener('change', (e) => {
  animation = e.target.value
})

const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d')

const playerImage = new Image()
playerImage.src = './assets/shadow_dog.png'

const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600
const spriteWidth = 575
const spriteheight = 523
let gameFrame = 0
const staggerFrames = 5
const spriteAnimation = []  

// llenamos el spriteAnimation con las coordenadas para cada animacion, ejemplo [{x:0, y:0}, {x:530, y:56}]
animationState.forEach((state, index) => {
  let frames = {
    loc: []
  }
  for(let j = 0; j<state.frames; j++){
    let positionX = j * spriteWidth
    let positionY = index * spriteheight
    frames.loc.push({x: positionX, y: positionY})
  }
  spriteAnimation[state.name] = frames
})

console.log(spriteAnimation)

const animate = () => {
  context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
  // context.fillRect(50,50,100,100)
  // context.drawImage(image, SourceX, SourceY, SourceWidth, SourceHeight, destinationX, destinationY, destinationW, destinationH )
  
  //obtiene valores 1,2,3... hasta n, siendo n el valor despues del simbolo de module
  let position = Math.floor(gameFrame/staggerFrames) % spriteAnimation[`${animation}`].loc.length;
  let frameX = spriteWidth * position
  let frameY = spriteAnimation[`${animation}`].loc[position].y


  context.drawImage(playerImage, frameX, frameY ,spriteWidth, spriteheight, 0, 0, spriteWidth, spriteheight)

  if(gameFrame % staggerFrames  == 0){
    if (frameX < 6)  frameX ++ 
    else frameX = 0
  }


  gameFrame++

  requestAnimationFrame(animate)
}

animate()

