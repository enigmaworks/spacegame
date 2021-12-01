export function playerMovement(change,player,keys){
    if (keys.left){
        player.rotationMomentum -= 2;
    } else if (keys.right){
        player.rotationMomentum += 2;
    } else {
        player.rotationMomentum *= .97;
    }
    player.speed = Math.sqrt((player.xMomentum**2) + (player.yMomentum**2));
    let speedMultiplier;
    if(keys.up){
        if(keys.space){
            speedMultiplier = player.boosterSpeed;
        } else {
            speedMultiplier = player.engineSpeed;
        }
        player.speedMultiplier = speedMultiplier;
            if(player.direction === 0 || player.direction === 360){
                player.yMomentum += 1 * speedMultiplier;
            } else if(player.direction === 90){
                player.xMomentum -= 1 * speedMultiplier;
            } else if(player.direction === 180){
                player.yMomentum -= 1 * speedMultiplier;
            } else if(player.direction === 270){
                player.xMomentum += 1 * speedMultiplier;
            } else if(player.direction < 90 && player.direction > 0){
                player.xMomentum += Math.cos((player.direction - 90) * (Math.PI/180)) * -1 * speedMultiplier;
                player.yMomentum += Math.sin((player.direction - 90) * (Math.PI/180)) * -1 * speedMultiplier;
            } else if(player.direction < 180 && player.direction > 90){
                player.xMomentum += Math.sin((player.direction - 180) * (Math.PI/180)) * speedMultiplier;
                player.yMomentum += Math.cos((player.direction - 180) * (Math.PI/180)) * -1 * speedMultiplier;
            } else if(player.direction < 270 && player.direction > 180){
                player.xMomentum += Math.cos((player.direction - 270) * (Math.PI/180)) * speedMultiplier;
                player.yMomentum += Math.sin((player.direction - 270) * (Math.PI/180)) * speedMultiplier;
            } else if(player.direction < 360 && player.direction > 270){
                player.xMomentum += Math.sin((player.direction - 360) * (Math.PI/180)) * -1 * speedMultiplier;
                player.yMomentum += Math.cos((player.direction - 360) * (Math.PI/180)) * speedMultiplier;
            }
    }

    let multiplier = 0.004;
    multiplier *= change;
    let rotateMultiplier = 0.005 * change;
    player.direction += player.rotationMomentum * rotateMultiplier;
    player.x += player.xMomentum * multiplier;
    player.y += player.yMomentum * multiplier;
    player.xMomentum *= .999 - change * 0.001;
    player.yMomentum *= .999 - change * 0.001;


    if (Math.abs(player.direction) > 360){
        player.direction = Math.abs(player.direction) - 360;
    }
    if (player.direction < 0){
  	    player.direction = 360 - Math.abs(player.direction);
    }
}
export function colisions(player,planets,units,planetSizeMultiplpier){
    Object.values(planets).forEach((planet)=>{
        let dist = units.distance(planet.x,planet.y,player.x,player.y);
        let collisonDist = player.collisionRadius + (planet.size * planetSizeMultiplpier);
        if(dist <= collisonDist){
            let planetRad = (planet.size * planetSizeMultiplpier)
            let collisonX = ((player.x * planetRad) + (planet.x * player.collisionRadius)) / (player.collisionRadius + planetRad);
            let collisonY = ((player.y * planetRad) + (planet.y * player.collisionRadius)) / (player.collisionRadius + planetRad);
            let distInsidePlanet = planetRad - units.distance(collisonX,collisonY,planet.x,planet.y);
            let distInsidePlayer = player.collisionRadius - units.distance(collisonX,collisonY,player.x,player.y);
            let distToMoveOut = distInsidePlanet + distInsidePlayer;
            player.xMomentum *= -0.1;
            player.yMomentum *= -0.1;
            player.x -= player.xGravity * distToMoveOut;
            player.y -= player.yGravity * distToMoveOut;
            console.log()
        }
    });
}
export function gravity(player,planets,units,radiusMultiplier, gravityMultiplier){
    player.currentPlanet = " ";
    player.currentType = " ";
    player.currentMakeup = " ";
    player.distToPlanet = 0;
    Object.values(planets).forEach((planet)=>{
        let dist = units.distance(planet.x,planet.y,player.x,player.y);
        let gravityDistance = player.collisionRadius + (((planet.size * 1.2) * radiusMultiplier) * gravityMultiplier + 100);
        if(dist <= gravityDistance){
            player.currentPlanet = planet.name;
            player.currentType = planet.type;
            player.currentMakeup = planet.makeup;
            let xDist = units.distance(player.x,0,planet.x,0);
            let yDist = units.distance(0,player.y,0,planet.y);
            player.distToPlanet = Math.sqrt((xDist**2)+(yDist**2)) - (player.collisionRadius + (planet.size * radiusMultiplier));
            let angle = 0;
            let xGravity = 0;
            let yGravity = 0;
            if(((player.x > planet.x) && (player.y > planet.y))
                || ((player.x < planet.x) && (player.y < planet.y))
            ){
                angle = units.toDeg(Math.atan(xDist/yDist));
                xGravity = Math.sin(units.toRad(angle));
                yGravity = Math.cos(units.toRad(angle));
            } else {
                angle = units.toDeg(Math.atan(yDist/xDist));
                xGravity = Math.cos(units.toRad(angle));
                yGravity = Math.sin(units.toRad(angle));
            }
            if(player.x > planet.x){
                if(player.y > planet.y){
                    // 0 < angle < 90
                    xGravity *= -1;
                    yGravity *= -1;
                } else {
                    // 90 < angle < 180
                    xGravity *= -1;
                }
            } else {
                if(player.y > planet.y){
                    // 270 < angle < 360
                    yGravity *= -1; 
                }
            }
            let gravityStregnth = (((planet.size ** 2.1) * .9) / (dist*2)) + 0.7;
            player.xMomentum += xGravity * gravityStregnth;
            player.yMomentum += yGravity * gravityStregnth;
            player.xGravity = xGravity;
            player.yGravity = yGravity;
        }
    });
}
export function moveCamera(player,camera,change){
    camera.xMomentum = ((player.x - camera.x)/3) * .06;
    camera.yMomentum = ((player.y - camera.y)/3) * .06;
    camera.x += camera.xMomentum * change;
    camera.y += camera.yMomentum * change;
}

export function movePlanets(planets,change,rotationMultiplier){
    Object.values(planets).forEach((planet)=>{
        let multiplier = 0.0001;
        planet.rotation += (change*multiplier)*(rotationMultiplier/planet.size);
        if (Math.abs(planet.direction) > 360){
            planet.rotation = Math.abs(planet.direction) - 360;
        }
        if (planet.direction < 0){
            planet.rotation = 360 - Math.abs(planet.direction);
        }
    });
}