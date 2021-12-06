let sprite = document.createElement("img")
sprite.src = "./imgs/sprite.svg";

export function renderPlayer(c,player,camera,keys,units,hitbox=false){
    c.save();
    c.translate(0,0);
    let screenX = player.x - camera.x;
    let screenY = player.y - camera.y;
    c.translate(screenX,screenY);
    c.rotate(units.toRad(player.direction));
    c.rotate(Math.PI/2);
    let displacement = -player.size/3;
    let rad = player.size * 0.1;
    if(keys.up){
        let gradient = c.createLinearGradient(displacement,0,displacement*1.5,0);
        gradient.addColorStop(0,"hsl(25,100%,50%)")
        gradient.addColorStop(1,"hsla(0,0%,0%,0)");
        c.fillStyle = gradient;
        c.beginPath();
        c.arc(displacement,3,rad,0,Math.PI*2);
        c.fill();
        c.beginPath();
        c.arc(displacement,-3,rad,0,Math.PI*2);
        c.fill();
        if(keys.space){
            let gradient = c.createLinearGradient(displacement,0,displacement*2.5,0);
            gradient.addColorStop(0,"hsl(25,100%,50%)")
            gradient.addColorStop(1,"hsla(0,0%,0%,0)");
            c.fillStyle = gradient;
            c.beginPath(); 
            c.moveTo(displacement,rad * 1.9);
            c.lineTo(displacement*2.1,0);
            c.lineTo(displacement,-rad * 1.9);
            c.fill();
        }
    }
    c.drawImage(sprite,displacement,displacement*1.5,player.size,player.size);
    if(hitbox){
        c.beginPath();
        c.fillStyle = "hsla(0,100%,60%,.2)"
        c.arc(0,0,player.collisionRadius,0,Math.PI*2);
        c.fill();
    }
    c.restore();
}