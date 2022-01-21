let sprite = document.createElement("img");
sprite.src = "./imgs/sprite.svg";

export function renderPlayer(c, player, camera, keys, units, hitbox = false) {
    c.save();
    c.translate(0, 0);
    let screenX = player.x - camera.x;
    let screenY = player.y - camera.y;
    c.translate(screenX, screenY);
    c.rotate(units.toRad(player.direction));
    c.rotate(Math.PI / 2);
    let displacement = -player.size / 3;
    c.drawImage(
        sprite,
        displacement,
        displacement * 1.5,
        player.size,
        player.size
    );
    if (hitbox) {
        c.beginPath();
        c.fillStyle = "hsla(0,100%,60%,.2)";
        c.arc(0, 0, player.collisionRadius, 0, Math.PI * 2);
        c.fill();
    }
    c.restore();
}
