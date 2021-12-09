let stars = [];
for(let i = 0; i<90000; i++){
    let obj = {x: Math.random(), y: Math.random(),alpha:Math.random()};
    stars.push(obj);
}

export function renderStars(c,camera,units){
    let universe = c.createLinearGradient(0,-units.ymax, units.xmax + 200,0);
    universe.addColorStop(0, "#110218");
    universe.addColorStop(.33, "#0a0a24");
    universe.addColorStop(.9, "#090212");
    universe.addColorStop(1, "#01110b");

    c.fillStyle = universe;
    c.fillRect(-units.xmax,-units.ymax,canvas.width,canvas.height);
    
    c.fillStyle = "white";
    c.save();
    stars.forEach((star,num)=>{
        let xPos = ((star.x * 4500) - 4500/2) * 2;
        let yPos = ((star.y * 4500) - 4500/2) * 2;
        let size;
        if(num % 100 === 0){
            xPos -= camera.x/12;
            yPos -= camera.y/12;
            size = 1.25;
        } else if (num % 50 === 0) {
            xPos -= camera.x/18;
            yPos -= camera.y/18;
            size = 1;
        } else if (num % 6 === 0){
            xPos -= camera.x/28;
            yPos -= camera.y/28;
            size = .75;
        } else {
           xPos -= camera.x/48;
           yPos -= camera.y/48;
           size = 0.5;
        }
        if(!((xPos > units.xmax) || (xPos < -units.xmax) || (yPos > units.ymax) || (yPos < -units.ymax))){
            c.globalAlpha = star.alpha + 0.1;
            c.beginPath();
            c.arc(xPos,yPos,size,0,Math.PI*2)
            c.fill();
        }
    })
    c.restore();
}