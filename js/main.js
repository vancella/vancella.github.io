'use strict';  
var stage, renderer, buitySpace, stars, player, enemy;
var width = document.getElementById("game_cont").width;
var height = document.getElementById("game_cont").height;
function init() {
      stage = new PIXI.Container();
      renderer = PIXI.autoDetectRenderer(
    width,
    height,
    {view:document.getElementById("game_cont")}
  );
   
buitySpace = new Far(width,height,"imgs/backgrounds/farback.gif");
stage.addChild(buitySpace);
    
stars = new Far(width,height,"imgs/backgrounds/starfield.png");
stage.addChild(stars);

    
player = new Player();
    
enemy = new Enemy();
    
requestAnimationFrame(update);
    
    
    }

function update() {
  buitySpace.update(0.05);
  stars.update(0.2);
  player.x+=player.speedX;
  player.y+=player.speedY;
  renderer.render(stage);

  requestAnimationFrame(update);
}