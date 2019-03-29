let bullet_list = new Array();

class Bullet {
    constructor(x,y){
        let circle = new PIXI.Graphics();
        circle.beginFill(0xffffaa);
        circle.drawCircle(0, 0, 5);
        circle.endFill();
        circle.x = 64;
        circle.y = 130;
        this.sprite = circle;
        this.sprite.position.x=x + 40;
        this.sprite.position.y=y;
        app.stage.addChild(this.sprite);
        this.speed = 10;
        bullet_list.push(this);
        
    }
    
    update()
{
    this.sprite.position.x += this.speed;
    if (this.sprite.position.x>700) {
        bullet_list.splice(0,1);
    };
    this.x=this.sprite.position.x;
    this.width=this.sprite.width;
    this.height=this.sprite.height;
}

}