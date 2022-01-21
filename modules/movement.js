import { gravityStregnth } from "./planets";

export function playerMovement(change, player, keys) {
    if (keys.left) {
        player.rotationMomentum -= 1;
    } else if (keys.right) {
        player.rotationMomentum += 1;
    } else {
        player.rotationMomentum *= 0.97;
    }
    let speedMultiplier = 1;
    let engineBoostX = 0;
    let engineBoostY = 0;
    if (keys.up) {
        if (keys.space) {
            speedMultiplier = player.boosterSpeed;
        } else {
            speedMultiplier = player.engineSpeed;
        }
        if (player.direction === 0 || player.direction === 360) {
            engineBoostY = 1;
        } else if (player.direction === 90) {
            engineBoostX = -1;
        } else if (player.direction === 180) {
            engineBoostY = -1;
        } else if (player.direction === 270) {
            engineBoostX = 1;
        } else if (player.direction < 90 && player.direction > 0) {
            engineBoostX = -Math.cos((player.direction - 90) * (Math.PI / 180));
            engineBoostY = -Math.sin((player.direction - 90) * (Math.PI / 180));
        } else if (player.direction < 180 && player.direction > 90) {
            engineBoostX = Math.sin((player.direction - 180) * (Math.PI / 180));
            engineBoostY = -Math.cos(
                (player.direction - 180) * (Math.PI / 180)
            );
        } else if (player.direction < 270 && player.direction > 180) {
            engineBoostX = Math.cos((player.direction - 270) * (Math.PI / 180));
            engineBoostY = Math.sin((player.direction - 270) * (Math.PI / 180));
        } else if (player.direction < 360 && player.direction > 270) {
            engineBoostX = -Math.sin(
                (player.direction - 360) * (Math.PI / 180)
            );
            engineBoostY = Math.cos((player.direction - 360) * (Math.PI / 180));
        }
        player.engineBoostX = engineBoostX;
        player.engineBoostY = engineBoostY;
    }
    player.xMomentum += engineBoostX * speedMultiplier;
    player.yMomentum += engineBoostY * speedMultiplier;

    let multiplier = 0.002;
    let rotateMultiplier = 0.005 * change;
    player.speed = Math.sqrt(player.xMomentum ** 2 + player.yMomentum ** 2);
    player.direction += player.rotationMomentum * rotateMultiplier;
    player.x += player.xMomentum * multiplier * change;
    player.y += player.yMomentum * multiplier * change;
    let num = change ** -0.003;
    player.xMomentum *= num;
    player.yMomentum *= num;

    if (Math.abs(player.direction) > 360) {
        player.direction = Math.abs(player.direction) - 360;
    }
    if (player.direction < 0) {
        player.direction = 360 - Math.abs(player.direction);
    }
}
export function colisions(player, planets, units, planetSizeMultiplpier) {
    Object.values(planets).forEach((planet) => {
        let dist = units.distance(planet.x, planet.y, player.x, player.y);
        let collisonDist =
            player.collisionRadius + planet.size * planetSizeMultiplpier;
        if (dist <= collisonDist) {
            let planetRad = planet.size * planetSizeMultiplpier;
            let collisonX =
                (player.x * planetRad + planet.x * player.collisionRadius) /
                (player.collisionRadius + planetRad);
            let collisonY =
                (player.y * planetRad + planet.y * player.collisionRadius) /
                (player.collisionRadius + planetRad);
            let distInsidePlanet =
                planetRad -
                units.distance(collisonX, collisonY, planet.x, planet.y);
            let distInsidePlayer =
                player.collisionRadius -
                units.distance(collisonX, collisonY, player.x, player.y);
            let distToMoveOut = distInsidePlanet + distInsidePlayer;
            player.xMomentum *= -0.1;
            player.yMomentum *= -0.1;
            player.x -= player.xGravity * distToMoveOut;
            player.y -= player.yGravity * distToMoveOut;
            console.log();
        }
    });
}
export function gravity(
    player,
    planets,
    units,
    radiusMultiplier,
    gravityMultiplier,
    gravityStregnth,
    gravityFalloff
) {
    player.currentPlanet.name = "";
    player.currentPlanet.id = null;
    player.currentPlanet.makeup = "";
    player.currentPlanet.type = "";
    player.currentPlanet.distance = 0;
    player.currentPlanet.gravity.angle = 0;
    player.currentPlanet.gravity.strength = 0;
    player.currentPlanet.gravity.x = 0;
    player.currentPlanet.gravity.y = 0;
    player.nearestPlanet.id = null;
    player.nearestPlanet.distance = Infinity;
    Object.values(planets).forEach((planet, id) => {
        let dist = units.distance(planet.x, planet.y, player.x, player.y);
        let gravityDistance =
            player.collisionRadius +
            planet.size * radiusMultiplier * gravityMultiplier;
        if (dist < player.nearestPlanet.distance) {
            player.nearestPlanet.id = id;
            player.nearestPlanet.distance = dist;
        }
        if (dist <= gravityDistance) {
            let xDist = units.distance(player.x, 0, planet.x, 0);
            let yDist = units.distance(0, player.y, 0, planet.y);
            let planetdistance =
                Math.sqrt(xDist ** 2 + yDist ** 2) -
                (player.collisionRadius + planet.size * radiusMultiplier);

            let angle = 0;
            let xGravity = 0;
            let yGravity = 0;
            if (
                (player.x > planet.x && player.y > planet.y) ||
                (player.x < planet.x && player.y < planet.y)
            ) {
                angle = Math.atan(xDist / yDist);
                xGravity = Math.sin(angle);
                yGravity = Math.cos(angle);
            } else {
                angle = Math.atan(yDist / xDist);
                xGravity = Math.cos(angle);
                yGravity = Math.sin(angle);
            }
            if (player.x > planet.x) {
                if (player.y > planet.y) {
                    angle = Math.PI * 2 - angle;
                    xGravity *= -1;
                    yGravity *= -1;
                } else {
                    angle = Math.PI * 1.5 - angle;
                    xGravity *= -1;
                }
            } else {
                if (player.y > planet.y) {
                    angle = Math.PI / 2 - angle;
                    yGravity *= -1;
                } else {
                    angle = Math.PI - angle;
                }
            }
            let deltaAngle = player.direction - units.toDeg(angle);
            let radDirection = units.toRad(player.direction);
            let sines = Math.sin(radDirection) + Math.sin(angle);
            let cossines = Math.cos(radDirection) + Math.cos(angle);
            let rotationInfluence = Math.atan2(sines / 2, cossines / 2);
            if (deltaAngle < 180) {
                rotationInfluence *= -1;
            }
            let gravityStregnth =
                (((planet.size ** gravityFalloff * radiusMultiplier) / 4) *
                    gravityStregnth) /
                    (dist * 2) +
                0.7;

            player.currentPlanet.name = planet.name;
            player.currentPlanet.id = id;
            player.currentPlanet.makeup = planet.makeup;
            player.currentPlanet.type = planet.type;
            player.currentPlanet.distance = planetdistance;
            player.currentPlanet.gravity.angle = angle;
            player.currentPlanet.gravity.strength = gravityStregnth;
            player.currentPlanet.gravity.x = xGravity;
            player.currentPlanet.gravity.y = yGravity;

            player.xMomentum += xGravity * gravityStregnth;
            player.yMomentum += yGravity * gravityStregnth;
            player.xGravity = xGravity;
            player.yGravity = yGravity;
        }
    });
}
export function moveCamera(player, camera, change) {
    camera.xMomentum = ((player.x - camera.x) / 3) * 0.06;
    camera.yMomentum = ((player.y - camera.y) / 3) * 0.06;
    camera.x += camera.xMomentum * change;
    camera.y += camera.yMomentum * change;
}

export function movePlanets(planets, change, rotationMultiplier) {
    Object.values(planets).forEach((planet) => {
        let multiplier = 0.01;
        // planet.rotation += (change*multiplier)*(rotationMultiplier/planet.size);
        if (Math.abs(planet.direction) > 360) {
            planet.rotation = Math.abs(planet.direction) - 360;
        }
        if (planet.direction < 0) {
            planet.rotation = 360 - Math.abs(planet.direction);
        }
    });
}
