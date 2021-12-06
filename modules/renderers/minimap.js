let sprite = document.createElement("img")
sprite.src = "./imgs/sprite.svg";

export function minimap(settings = {},destination = null, c,player,camera,planets,text,units,radiusMultiplier, gravityMultiplier){
    let size = settings.size || 75;
    let offset = settings.offset || 25;
    let zoom = settings.zoom || 10;

    c.save();
    c.translate(-units.xmax + (offset + size),units.ymax - (offset + size)); // bottom left of screen
    c.beginPath();
    c.strokeStyle = "#fffb"
    c.fillStyle = "#111b" // semitransparent black
    c.rect(-size,-size,size*2,size*2)
    c.stroke();
    c.fill();

    let roundedX = Math.round(player.x);
    let roundedY = Math.round(player.y);
    text(`X: ${roundedX}`, -size + 5,-size + 5,{align: "left", baseline: "top", font: "Red Hat Mono", size: 12})
    text(`Y: ${-roundedY}`, size -5,-size + 5,{align: "right", baseline: "top", font: "Red Hat Mono", size: 12})
    
    let inset = 0;
    let clip = new Path2D();
    clip.rect(-size - inset,-size - inset,size*2 +2*inset,size*2 + 2*inset);
    c.clip(clip);
    
    let ratio = 1/zoom; // screen pixels per map pixel

    let cx = camera.x * ratio;
    let cy = camera.y * ratio;

    let destX = (planets[destination].x * ratio) - cx;
    let destY = (planets[destination].y * ratio) - cy;
    let destDirection = units.direction(0,0,destX,destY);
    let destDistance = units.distance(0,0,destX,destY);

    planets.forEach((planet,id)=>{
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
            if (id === player.currentPlanetId) c.globalAlpha = 1;
            else c.globalAlpha = .4;
            c.arc(0,0,planetRadius,0,Math.PI*2);
            c.fill();
            c.closePath();
            
            c.globalAlpha = 1;
            text(planet.name, 0,0, {align: "center", baseline: "alphabetic",size: (planet.size/planet.name.length)/2 + 7, color: "white", maxwidth: planetRadius});
            c.restore();
        }
    });
    c.save();
    c.rotate(units.toRad(player.direction));
    c.rotate(Math.PI/2);
    c.drawImage(sprite,-zoom/11,-zoom/5,zoom/2.5,zoom/2.5);
    c.restore();

    let p = 5; //padding from edge
    let x = size - p;
    let y = size - p;
    if(Math.abs(destX) > size - p || Math.abs(destY) > size - p){
        if(destX < -size + p){
            x = -size + p;
        } else if (Math.abs(destX) < size - p){
            x = destX;
        }
        if(destY < -size + p){
            y = -size + p;
        } else if (Math.abs(destY) < size - p){
            y = destY;
        }
    } else {
        x = destX;
        y = destY;
    }
    let markerSize = 7/2**(destDistance/180);
    if(markerSize < .9) markerSize = .9;
    if (markerSize > 1.6) markerSize = 1.6;
    if(destDistance/40 - 1 < markerSize) markerSize = destDistance/40 - 1;
    if(markerSize <= .75) markerSize = 0;
    c.save();
    c.translate(x,y);
    c.rotate(destDirection)
    c.beginPath();
    c.fillStyle = "red";
    c.moveTo(-4 * markerSize,10 * markerSize);
    c.lineTo(0,0);
    c.lineTo(4 * markerSize,10 * markerSize);
    c.closePath();
    c.fill();
    c.restore();
    c.restore();
}
