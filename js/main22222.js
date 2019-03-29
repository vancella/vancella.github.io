'use strict';

let state, gameStartScene, gameName, startGame, startMusic,
    gameScene, fighter,healthBar, innerBar, outerBar, shrot_enemy, scores, scoreCount, boom,
    gameOverScene,gOmessage, looseMusic, bg_start1, bg_start2, bg, starz, bg_over1, bg_over2;


boom = new Audio('sfx/lowlife.wav');
startMusic = new Audio('sfx/magic_space.mp3');
startMusic.loop = true;
looseMusic = new Audio ('sfx/start.mp3');
looseMusic.loop = true;

let app = new PIXI.Application({ 
    width: 600, 
    height: 400,  
    antialiasing: true, 
    transparent: false, 
    resolution: 1,
    autoResize: true,
    view: document.getElementById('game')
  }
);
document.body.appendChild(app.view);

let f_frames = [ 
    "imgs/ship/f1.png",
    "imgs/ship/f2.png",
    "imgs/ship/f3.png",
    "imgs/ship/f4.png"],
    e_frames = [
    "imgs/enemy/e_f1c.png",
    "imgs/enemy/e_f2c.png",
    "imgs/enemy/e_f3c.png",
    "imgs/enemy/e_f4c.png",
    "imgs/enemy/e_f5c.png",
    "imgs/enemy/e_f6c.png"
    ];
    
PIXI.loader
    .add(f_frames)
    .add(["imgs/bg_player.json",
        "imgs/boss_n_enemy.json"
       ])
    .load(setup);

function setup() {
 //start   
gameStartScene = new PIXI.Container();
app.stage.addChild(gameStartScene);

bg_start1 = new Far(600,400,"imgs/backgrounds/farback.gif");
gameStartScene.addChild(bg_start1);
    
bg_start2 = new Far(600,400,"imgs/backgrounds/starfield.png");
gameStartScene.addChild(bg_start2);
    
startGame = new PIXI.Text('Жми старт!', {
    fontFamily: "Arial",
      fontSize: 24,
      fill: "white",
      stroke: '#ff3300',
      strokeThickness: 1
    });
    startGame.interactive = true;
    startGame.on('pointerdown', function(){if (gameStartScene.visible||gameOverScene.visible) {
        gameScene.visible = true;
        gameStartScene.visible = false;
        gameOverScene.visible = false;
        shrot_enemy = new EnemyManager();
        healthBar.outer.width = 128;
        state=play;
        scores = 0;
        startMusic.play();
        looseMusic.pause();
        }})
    startGame.position.set(200,300);
    gameStartScene.addChild(startGame); 
    
startGame = new PIXI.Text('Космический пацифист)', {
    fontFamily: "Arial",
      fontSize: 50,
      fill: "green",
      stroke: '#ff3300',
      strokeThickness: 1
    });
    startGame.position.set(25,150);
    gameStartScene.addChild(startGame);

 state = start; 
    
    
 //game   
gameScene = new PIXI.Container();
app.stage.addChild(gameScene);

bg = new Far(600,400,"imgs/backgrounds/farback.gif");
gameScene.addChild(bg);
    
starz = new Far(600,400,"imgs/backgrounds/starfield.png");
gameScene.addChild(starz);    
   
    //player
    
fighter = PIXI.AnimatedSprite.fromFrames(f_frames);
    fighter.y=app.stage.height/2-fighter.height/2;
    fighter.x=0;
    fighter.speedX = 0;
    fighter.speedY = 0;
    fighter.animationSpeed = 0.3; 
    fighter.play();
    fighter.interactive = true;
    fighter.kooX = function () {
        if (fighter.x<=0){
            fighter.speedX = 0;
            fighter.x=0;
        }
        else if (fighter.x>600-fighter.width){
            fighter.speedX=0;
            fighter.x=600-fighter.width;
        }
    };
    fighter.kooY = function () {
        if (fighter.y<=0){
            fighter.speedY = 0;
            fighter.y=0;
        }
        else if (fighter.y>=400-fighter.height){
            fighter.speedY=0;
            fighter.y=400-fighter.height;
        }
    };
      
    gameScene.addChild(fighter);
  
    //health
healthBar = new PIXI.Container();
    healthBar.position.set(app.stage.width/2-64, 4);
    gameScene.addChild(healthBar);
    innerBar = new PIXI.Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(0, 0, 128, 8);
    innerBar.endFill();
    healthBar.addChild(innerBar);
    outerBar = new PIXI.Graphics();
    outerBar.beginFill(0xFF3300);
    outerBar.drawRect(0, 0, 128, 8);
    outerBar.endFill();
    healthBar.addChild(outerBar);
    healthBar.outer = outerBar;
    
  
    

    left_arr = new PIXI.Graphics();
        left_arr.beginFill(0xFF3300);
        left_arr.drawPolygon([0,0,-16,32,16,32])
        left_arr.endFill();
        left_arr.position.x = 30;
        left_arr.position.y = 200;
        left_arr.alpha = 0.5;
        left_arr.rotation = -(Math.PI/2);
        left_arr.interactive = true;
        left_arr.buttonMode = true;
        gameScene.addChild(left_arr);
    left_arr.on('pointertap', function(){fighter.speedX = -2;});
    left_arr.on('pointerout', function(){fighter.speedX = 0;});
    
    right_arr = new PIXI.Graphics();
        right_arr.beginFill(0xFF3300);
        right_arr.drawPolygon([0,0,-16,32,16,32])
        right_arr.endFill();
        right_arr.position.x = 150;
        right_arr.position.y = 200;
        right_arr.alpha = 0.5;
        right_arr.rotation = (Math.PI/2);
        right_arr.interactive = true;
        right_arr.buttonMode = true;
        gameScene.addChild(right_arr);
    right_arr.on('pointertap', function(){fighter.speedX = 2;});
    right_arr.on('pointerout', function(){fighter.speedX = 0;});
    
    up_arr = new PIXI.Graphics();
        up_arr.beginFill(0xFF3300);
        up_arr.drawPolygon([0,0,-16,32,16,32])
        up_arr.endFill();
        up_arr.position.x = 90;
        up_arr.position.y = 145;
        up_arr.alpha = 0.5;
        up_arr.interactive = true;
        up_arr.buttonMode = true;
        gameScene.addChild(up_arr);
    up_arr.on('pointertap', function(){fighter.speedY = -2;});
    up_arr.on('pointerout', function(){fighter.speedY = 0;});
    
    down_arr = new PIXI.Graphics();
        down_arr.beginFill(0xFF3300);
        down_arr.drawPolygon([0,0,-16,32,16,32])
        down_arr.endFill();
        down_arr.position.x = 90;
        down_arr.position.y = 255;
        down_arr.alpha = 0.5;
        down_arr.rotation = -(Math.PI);
        down_arr.interactive = true;
        down_arr.buttonMode = true;
        gameScene.addChild(down_arr);
    down_arr.on('pointertap', function(){fighter.speedY = 2;});
    down_arr.on('pointerout', function(){fighter.speedY = 0;});
    
scoreCount = new PIXI.Text('', {
    fontFamily: "Arial",
    fontSize: 14,
    fill: "white",
    stroke: '#ff3300',
    strokeThickness: 1
    });
    scoreCount.position.set(4, 4);
    gameScene.addChild(scoreCount);
    
    
    

    
  //game over  
gameOverScene = new PIXI.Container();
app.stage.addChild(gameOverScene);
   
bg_over1 = new Far(600,400,"imgs/backgrounds/farback.gif");
gameOverScene.addChild(bg_over1);
    
bg_over2 = new Far(600,400,"imgs/backgrounds/starfield.png");
gameOverScene.addChild(bg_over2);
    
gOmessage = new PIXI.Text('Гамовер', {
    fontFamily: "Arial",
      fontSize: 50,
      fill: "green",
      stroke: '#ff3300',
      strokeThickness: 1
    });
    gOmessage.position.set(150,150);
    gameOverScene.addChild(gOmessage);   
    
//state = start;
   
gameScene.visible = false;
gameOverScene.visible = false;
       
app.ticker.add(delta => gameLoop(delta));
}



function gameLoop(delta) {
    state(delta);
}

function start(delta) {
    bg_start1.update(-0.5);
    bg_start2.update(-2);
}

function play(delta) {
    //movin bg
    bg.update(0.08);
    starz.update(0.5);
    //movin player
    fighter.x+=fighter.speedX;
    fighter.y+=fighter.speedY;
    fighter.kooX();
    fighter.kooY();
    //movin enemies
    if(healthBar.outer.width>0){shrot_enemy.update();}
    //damage
    for (var i=0; i< shrot_enemy.enemyList.length; i++) {
    if  (collision(fighter, shrot_enemy.enemyList[i])) {
           healthBar.outer.width-=1;
            boom.play();
    }
        };
    //scores
    
    if (shrot_enemy.enemyList.length>0) {
        for (var i=0; i< shrot_enemy.enemyList.length; i++){
            if (shrot_enemy.enemyList[i].x<4) scores++;
            scoreCount.text = 'Очки:'+scores;
        }
    };
    //looosin
    if(healthBar.outer.width<=0) {
        gameScene.visible = false;
        gameOverScene.visible = true;
        for (var i=0; i< shrot_enemy.enemyList.length; i++){
            shrot_enemy.enemyList[i].destroy();
        };
        startMusic.pause();
        looseMusic.play();
        shrot_enemy.enemyList.length=0;
        state = gameOver;
        clearInterval(inter);
    };

}

function gameOver(delta) {
    bg_over1.update(-0.8);
    bg_over2.update(2);
}