function collision(obj1, obj2) {

  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  hit = false;

  obj1.centerX = obj1.x + obj1.width / 2;
  obj1.centerY = obj1.y + obj1.height / 2;
  obj2.centerX = obj2.x;
  obj2.centerY = obj2.y;


  obj1.halfWidth = obj1.width / 2;
  obj1.halfHeight = obj1.height / 2;
  obj2.halfWidth = obj2.width / 2;
  obj2.halfHeight = obj2.height / 2;

  
  vx = obj1.centerX - obj2.centerX;
  vy = obj1.centerY - obj2.centerY;

  combinedHalfWidths = obj1.halfWidth + obj2.halfWidth;
  combinedHalfHeights = obj1.halfHeight + obj2.halfHeight;

  if (Math.abs(vx) < combinedHalfWidths) {


    if (Math.abs(vy) < combinedHalfHeights) {

      hit = true;
    } 
      else 
    {
      hit = false;
    }
  } 
    else {
    hit = false;
  }
  return hit;
};


