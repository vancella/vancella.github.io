'use strict';
function Player() {
    var f_frames = [ 
    "imgs/ship/f1.png",
    "imgs/ship/f2.png",
    "imgs/ship/f3.png",
    "imgs/ship/f4.png"

];
    
PIXI.loader.add(f_frames).load(setup);

function setup() {
  player = PIXI.extras.AnimatedSprite.fromFrames(f_frames);
    player.y=stage.height/2-player.height/2;
    player.animationSpeed = 0.3; 
    player.speedX=0;
    player.speedY=0;
    player.play();
    stage.addChild(player);
    

    
var left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");
    
      
    
//left
  left.press = () => {
    player.speedX = -2;
    player.speedY = 0;
  };
  left.release = () => {
    if (!right.isDown && player.speedY === 0) {
      player.speedX = 0;
    }
  };
    
//right
  right.press = () => {
    player.speedX = 2;
    player.speedY = 0;
  };
  right.release = () => {
    if (!left.isDown && player.speedY === 0) {
      player.speedX = 0;
    }
  };
    
  //up
  up.press = () => {
    player.speedY = -2;
    player.speedX = 0;
  };
  up.release = () => {
    if (!down.isDown && player.speedX === 0) {
      player.speedY = 0;
    }
  };
    
//down
  down.press = () => {
    player.speedY = 2;
    player.speedX = 0;
  };
  down.release = () => {
    if (!up.isDown && player.speedX === 0) {
      player.speedY = 0;
    }
  };
    
}
   
}
