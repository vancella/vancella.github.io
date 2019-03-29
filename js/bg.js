'use strict'
function Far(width, height, tex) {
  var texture = PIXI.Texture.fromImage(tex);
  PIXI.TilingSprite.call(this, texture, width, height);
  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
}

Far.prototype = Object.create(PIXI.TilingSprite.prototype); 

Far.prototype.update = function(speed) {
  this.tilePosition.x -= speed;
};

