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
    text(`X: ${roundedX}`, -units.xmax + 10,-units.ymax + 30,{align: "left", font: "Red Hat Mono", size: 15})
    text(`Y: ${-roundedY}`, -units.xmax + 10,-units.ymax + 50,{align: "left", font: "Red Hat Mono", size: 15})
    text(`Speed: ${avgSpeed}`, -units.xmax + 160,-units.ymax + 40,{align: "left", font: "Red Hat Mono", size: 15})
    text(`${player.currentPlanet}`, -units.xmax + 10,-units.ymax + 90,{align: "left", weight: 800, color: "white"})
    // text(player.currentMakeup, -units.xmax + 15,-units.ymax + 115,{align: "left", maxwidth: 250})

    /*          COMPASS             */
    //compass base
    c.beginPath();
    c.arc(-units.xmax + 130, -units.ymax + 38, 15,0,Math.PI*2);
    c.strokeStyle = "white";
    c.fillStyle="#0006";
    c.stroke();
    c.fill();
    c.closePath();
    // compass arrow
    c.save();
    c.translate(-units.xmax + 130, -units.ymax + 38); //center of compass
    c.rotate(units.toRad(player.direction));
    c.beginPath();
    c.moveTo(-4,-7); //triangle path
    c.lineTo(0,5);
    c.lineTo(4,-7);
    c.strokeStyle = "white";
    c.fillStyle = "white";
    c.lineWidth = 3;
    c.stroke();
    c.fill();
    c.closePath();
    c.restore();
}

export function renderPlanets(c,planets,camera,units,radiusMultiplier, gravityMultiplier,atmosphereMultiplier,renderGravity = false){
    Object.values(planets).forEach((planet)=>{ //iterate over each planet
        c.save();
        //transform world coordinates to screen coordinates
        let screenX = planet.x - camera.x; 
        let screenY = planet.y - camera.y;
        //set drawing origin and rotation
        c.translate(screenX,screenY);
        c.rotate(units.toRad(planet.rotation));

        // debugging function
        if(renderGravity){
            c.beginPath();
            c.arc(0,0,((planet.size * radiusMultiplier) * gravityMultiplier),0,Math.PI*2);
            c.fillStyle = "hsla(0,100%,60%,.2)";
            c.fill();
        }

        // partially transparent atmosphere
        let atmosphereRadius = planet.size * radiusMultiplier * atmosphereMultiplier + 100;
        let atmosphere = c.createRadialGradient(0,0,(planet.size * radiusMultiplier) - 80,0,0,atmosphereRadius);
        atmosphere.addColorStop(0.05,planet.atmosphere);
        atmosphere.addColorStop(1,"hsla(0,0%,0%,0)");
        let preAtmosphere = c.createRadialGradient(0,0,planet.size * radiusMultiplier,0,0,atmosphereRadius);
        preAtmosphere.addColorStop(0,"#0a0a24");
        preAtmosphere.addColorStop(0.75,"hsla(0,0%,0%,0)");
        c.fillStyle = preAtmosphere;
        c.globalAlpha = .75;
        c.beginPath();
        c.arc(0,0,planet.size * radiusMultiplier * atmosphereMultiplier, 0, Math.PI * 2);
        c.fill();
        c.globalAlpha = .2;
        c.fillStyle = atmosphere;
        c.beginPath();
        c.arc(0,0,planet.size * radiusMultiplier * atmosphereMultiplier, 0, Math.PI * 2);
        c.fill();
        c.globalAlpha = 1;

        //fill planet
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

export function minimap(settings = {},c,player,camera,planets,text,units,radiusMultiplier, gravityMultiplier){
    let size = settings.size || 75;
    let offset = settings.offset || 25;
    let zoom = settings.zoom || 10;

    c.save();
    c.translate(-units.xmax + (offset + size),units.ymax - (offset + size)); // bottom left of screen
    c.beginPath();
    c.strokeStyle = "#fffb"
    c.fillStyle = "#000d" // semitransparent black
    c.rect(-size,-size,size*2,size*2)
    c.stroke();
    c.fill();

    let roundedX = Math.round(player.x);
    let roundedY = Math.round(player.y);
    text(`X: ${roundedX}`, -size + 5,-size + 5,{align: "left", baseline: "top", font: "Red Hat Mono", size: 12})
    text(`Y: ${-roundedY}`, size -5,-size + 5,{align: "right", baseline: "top", font: "Red Hat Mono", size: 12})
    
    let region = new Path2D();
    region.rect(-size,-size,size*2,size*2);
    c.clip(region);
    
    let ratio = 1/zoom; // screen pixels per map pixel

    let cx = camera.x * ratio;
    let cy = camera.y * ratio;

    Object.values(planets).forEach((planet)=>{
        let px = (planet.x * ratio) - cx;
        let py =( planet.y * ratio) - cy;
        let planetRadius = (planet.size * radiusMultiplier) * ratio
        if((px + (planetRadius * gravityMultiplier) > -size) &&
            (px - (planetRadius * gravityMultiplier) < size) &&
            (py + (planetRadius * gravityMultiplier) > -size) &&
            (py - (planetRadius * gravityMultiplier) < size) ){
            c.save();

            c.translate(px, py); // center of planet on map
            c.rotate(units.toRad(planet.rotation));
            c.beginPath();
            c.moveTo(0,0);

            c.beginPath();
            c.arc(0,0,planetRadius * gravityMultiplier,0,Math.PI*2);
            c.strokeStyle = "lightgray";
            c.lineWidth = .75;
            c.globalAlpha = .5;
            c.stroke();

            let fill = "#888"; // backup fill
            if(planet.fill.type === "color"){
                fill = planet.fill.f;
            }
            if(planet.fill.type === "img"){
                fill = c.createPattern(planet.fill.f, "no-repeat");
            }
            if(planet.fill.type === "gradient"){
                let rad = planet.size * radiusMultiplier;
                //create gradient from corner to corner of planet bounding box
                fill = c.createLinearGradient(size,size,-size,-size);
                Object.values(planet.fill.f).forEach((stop)=>{
                    fill.addColorStop(stop.s,stop.c);
                });
            }
            c.fillStyle = fill; 
            c.beginPath();
            if (planet.id === player.currentPlanetId) c.globalAlpha = 1;
            else c.globalAlpha = .5;
            c.arc(0,0,planetRadius,0,Math.PI*2);
            c.fill();
            c.closePath();
            
            c.globalAlpha = 1;
            text(planet.name, 0,0, {align: "center", baseline: "alphabetic",size: (planet.size/planet.name.length)/2 + 7, color: "white", maxwidth: planetRadius});

            c.restore();
        }
    });

    c.rotate(units.toRad(player.direction));
    c.rotate(Math.PI/2);
    c.drawImage(sprite,-2,-3,6,6);
    c.restore();
}

let stars = [];
for(let i = 0; i<90000; i++){
    let obj = {x: Math.random(), y: Math.random(),alpha:Math.random()};
    stars.push(obj);
}

export function renderStars(c,camera,units){
    c.fillStyle = "white";
    c.save();
    stars.forEach((star,num)=>{
        let xPos = ((star.x * 3500) - 3500/2) * 2;
        let yPos = ((star.y * 3500) - 3500/2) * 2;
        let size;
        if(num % 100 === 0){
            xPos -= camera.x/8;
            yPos -= camera.y/8;
            size = 1.25;
        } else if (num % 50 === 0) {
            xPos -= camera.x/16;
            yPos -= camera.y/16;
            size = 1;
        } else if (num % 6 === 0){
            xPos -= camera.x/24;
            yPos -= camera.y/24;
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