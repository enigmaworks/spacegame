export function renderEffects(c,planets,camera,units,radiusMultiplier, gravityMultiplier,atmosphereMultiplier,renderGravity = false){
    planets.forEach((planet)=>{ //iterate over each planet
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
        c.restore();
    });
}