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