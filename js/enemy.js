let inter    
class EnemyManager
{
    constructor()
    {
        this.enemyList = [];
        let en = function()
        {
            this.enemy = PIXI.AnimatedSprite.fromFrames(e_frames);
            this.enemy.play();
            this.enemy.animationSpeed = 0.3;
            this.enemy.anchor.set(0.5, 0.5);
            this.enemy.position.set(610, 350 * Math.random());
            gameScene.addChild(this.enemy);
            this.enemyList.push(this.enemy);
        }
        
        inter = window.setInterval(en.bind(this), 400);

    }

    update()
    {
        if(gameScene.visible=true){
        this.enemyList.forEach(function(element, index, array) {
            element.position.x -= 3;

            if (element.position.x < 0) {
                element.destroy();
                array.splice(0, 1);
            }
            
        });}
        
    }
}