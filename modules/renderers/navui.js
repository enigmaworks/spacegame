export function renderNavTools(c,player,camera,planets,destination,minimapsize,text,units,radiusMultiplier){
    let roundedX = Math.round(player.x / 10);
    let roundedY = Math.round(player.y / 10);
    let avgSpeed = Math.round(player.speed)/10;
    let formatter = new Intl.NumberFormat("en-US", {minimumIntegerDigits: 4,minimumFractionDigits: 2, useGrouping: false});
    avgSpeed = formatter.format(avgSpeed)
    text(`${roundedX},`, units.xmax - 70,-units.ymax + 30,{align: "right", font: "Red Hat Mono", size: 15})
    text(`${-roundedY}`, units.xmax - 70,-units.ymax + 30,{align: "left", font: "Red Hat Mono", size: 15})
    // text(`velocity: ${avgSpeed}`, units.xmax - 40,-units.ymax + 60,{align: "right", font: "Red Hat Mono", size: 15})
    // text(`${player.currentPlanet}`, units.xmax - 230,-units.ymax + 30,{align: "left", maxwidth: 200, color: "white"})
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