function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}


//movin fighter

var left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown"),
    fire = keyboard(" "),
    gaming = keyboard("s"),
    restart = keyboard("r");
        
      
    
//left
  left.press = () => {
    fighter.speedX = -2;
    fighter.speedY = 0;
  };
  left.release = () => {
    if (!right.isDown && fighter.speedY === 0) {
      fighter.speedX = 0;
    }
  };
    
//right
  right.press = () => {
    fighter.speedX = 2;
    fighter.speedY = 0;
  };
  right.release = () => {
    if (!left.isDown && fighter.speedY === 0) {
      fighter.speedX = 0;
    }
  };
    
  //up
  up.press = () => {
    fighter.speedY = -2;
    fighter.speedX = 0;
  };
  up.release = () => {
    if (!down.isDown && fighter.speedX === 0) {
      fighter.speedY = 0;
    }
  };
    
//down
  down.press = () => {
    fighter.speedY = 2;
    fighter.speedX = 0;
  };
  down.release = () => {
    if (!up.isDown && fighter.speedX === 0) {
      fighter.speedY = 0;
    }
  };

//fire
    fire.press = () => {
    let bullet = new Bullet(fighter.position.x+fighter.width/2, fighter.position.y+fighter.height/2);
  };

//start-restart
    gaming.press = () => {
        if (gameStartScene.visible||gameOverScene.visible) {
        gameScene.visible = true;
        gameStartScene.visible = false;
        gameOverScene.visible = false;
        shrot_enemy = new EnemyManager();
        healthBar.outer.width = 128;
        state=play;
        scores = 0;
        startMusic.play();
        looseMusic.pause();
        }
    }
    
//tapin

let left_arr, right_arr, up_arr, down_arr;




/*class Arrow extends PIXI.Graphics{
    constructor(x, y, scene){
        let ar = new PIXI.Graphics();
        super();
        ar.beginFill(0x000000);
        ar.drawRect(0, 0, 70, 70);
        ar.endFill();
        this.sprite = ar;
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.sprite.alpha = 0.5;
        scene.addChild(this);
    }
}  
*/



