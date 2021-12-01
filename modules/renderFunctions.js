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

export function renderNavTools(c,player,camera,planets,text,units,radiusMultiplier){
    let roundedX = Math.round(player.x);
    let roundedY = Math.round(player.y);
    let avgSpeed = Math.round(player.speed*100)/100;
    let formatter = new Intl.NumberFormat("en-US", {minimumIntegerDigits: 3,minimumFractionDigits: 2});
    avgSpeed = formatter.format(avgSpeed)
    text(`X: ${roundedX}`, -units.xmax + 10,-units.ymax + 30,{align: "left",font: "teko"})
    text(`Y: ${-roundedY}`, -units.xmax + 10,-units.ymax + 50,{align: "left"})
    text(`Speed: ${avgSpeed}`, -units.xmax + 140,-units.ymax + 40,{align: "left"})
    text(`Engine Boost: ${player.speedMultiplier}`, -units.xmax + 300,-units.ymax + 40,{align: "left"})
    text(`${player.currentPlanet}`, -units.xmax + 10,-units.ymax + 90,{align: "left", weight: 800, color: "white"})
    // text(player.currentMakeup, -units.xmax + 15,-units.ymax + 115,{align: "left", maxwidth: 250})

    //compass
    c.beginPath();
    c.arc(-units.xmax + 110, -units.ymax + 38, 15,0,Math.PI*2);
    c.fillStyle = "hsla(0,0%,100%,.3)";
    c.strokeStyle = "white";
    c.stroke();
    c.fill();
    c.save();
    c.translate(-units.xmax + 110, -units.ymax + 38);
    c.rotate(units.toRad(player.direction));
    c.beginPath();
    c.moveTo(-4,-7);
    c.lineTo(0,7);
    c.lineTo(4,-7);
    c.strokeStyle = "white";
    c.fillStyle = "hsla(0,0%,100%,.3)";
    c.lineWidth = 2;
    c.lineCap = "round";
    c.fill();
    c.stroke();
    c.restore();
    //map
    c.save();
    c.translate(-units.xmax + 90,units.ymax - 90);
    c.fillStyle = "hsla(0,100%,0%,0.8)"
    c.rect(-75,-75,150,150)
    c.stroke();
    c.fill();
    let ratio = 1/100;
    Object.values(planets).forEach((planet)=>{
        c.save();
        c.translate(planet.x*ratio,planet.y*ratio);
        c.rotate(units.toRad(planet.rotation));
        c.beginPath();
        c.moveTo(0,0);
        let size = (planet.size * radiusMultiplier) * ratio;
        let fill = "#888";
        if(planet.fill.type === "color"){
            fill = planet.fill.f;
        }
        if(planet.fill.type === "img"){
            fill = c.createPattern(planet.fill.f, "no-repeat");
        }
        if(planet.fill.type === "gradient"){
            let rad = planet.size * radiusMultiplier
            fill = c.createLinearGradient(size,size,-size,-size);
            Object.values(planet.fill.f).forEach((stop)=>{
                fill.addColorStop(stop.s,stop.c);
            });
        }
        c.fillStyle = fill;
        c.arc(0,0,size,0,Math.PI*2);
        c.fill();
        c.restore();
    });
    if(Math.abs(camera.x * ratio) > 76 || Math.abs(camera.y * ratio) > 76){
        let x = 75;
        let y = 75;
        if(camera.x * ratio < -75){
            x = -75;
        } else if (Math.abs(camera.x * ratio) < 75){
            x = camera.x * ratio;
        }
        if(camera.y * ratio < -75){
            y = -75;
        } else if (Math.abs(camera.y * ratio) < 75){
            y = camera.y * ratio;
        }
        c.translate(x,y);
        c.beginPath();
        c.fillStyle = "red";
        c.arc(0,0,3,0,Math.PI*2);
        c.fill();
    } else {
        c.translate(camera.x * ratio,camera.y * ratio);
        c.rotate(units.toRad(player.direction));
        c.rotate(Math.PI/2);
        c.drawImage(sprite,-2,-3,6,6);
    }
    c.restore();

}

export function renderPlanets(c,planets,camera,units,radiusMultiplier, gravityMultiplier,atmosphereMultiplier,renderGravity = false){
    Object.values(planets).forEach((planet)=>{
        c.save();
        let screenX = planet.x - camera.x;
        let screenY = planet.y - camera.y;
        c.translate(screenX,screenY);
        c.rotate(units.toRad(planet.rotation));
        if(renderGravity){
            c.beginPath();
            c.arc(0,0,(((planet.size * 1.2) * radiusMultiplier) * gravityMultiplier + 100),0,Math.PI*2);
            c.fillStyle = "hsla(0,100%,60%,.2)";
            c.fill();
        }
        let atmosphereRadius = planet.size * radiusMultiplier * atmosphereMultiplier + 100;
        let atmosphere = c.createRadialGradient(0,0,planet.size * radiusMultiplier,0,0,atmosphereRadius);
        atmosphere.addColorStop(0,"hsla(0,0%,0%,0)");
        // atmosphere.addColorStop(0.05,planet.atmosphere);
        atmosphere.addColorStop(1,"hsla(0,0%,0%,0)");
        c.fillStyle = atmosphere;
        c.beginPath();
        c.arc(0,0,planet.size * radiusMultiplier * atmosphereMultiplier, 0, Math.PI * 2);
        c.fill();
        let fill = "#888";
        if(planet.fill.type === "color"){
            fill = planet.fill.f;
        }
        if(planet.fill.type === "img"){
            fill = c.createPattern(planet.fill.f, "no-repeat");
        }
        if(planet.fill.type === "gradient"){
            let rad = planet.size * radiusMultiplier
            fill = c.createLinearGradient(rad,rad,-rad,-rad);
            Object.values(planet.fill.f).forEach((stop)=>{
                fill.addColorStop(stop.s,stop.c);
            });
        }
        c.beginPath();
        c.fillStyle = fill;
        c.arc(0,0,planet.size * radiusMultiplier, 0, Math.PI * 2);
        c.fill();
        c.restore();
    });
}