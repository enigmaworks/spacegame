export function renderPlanets(c,planets,camera,units,radiusMultiplier, gravityMultiplier,atmosphereMultiplier,renderGravity = false){
    planets.forEach((planet)=>{ //iterate over each planet
        c.save();
        //transform world coordinates to screen coordinates
        let screenX = planet.x - camera.x; 
        let screenY = planet.y - camera.y;
        //set drawing origin and rotation
        c.translate(screenX,screenY);
        c.rotate(units.toRad(planet.rotation));

        //fill planet
        let fill = "#888";
        if(planet.fill.type === "color"){
            fill = planet.fill.f;
        }
        if(planet.fill.type === "img"){
            fill = c.createPattern(planet.fill.f, "repeat");
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