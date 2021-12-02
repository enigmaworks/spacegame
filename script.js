let canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.id = "canvas";

let c = canvas.getContext("2d");
let time;

WebFont.load({
    google: {
      families: ["Teko:300","Red+Hat+Mono:500"]
    },
    timeout: 3000,
    active: setup,
    fontinactive: setupWithInactive,
});

import {renderNavTools, renderPlanets, renderPlayer } from "./modules/renderFunctions.js";
import {text, useBackupFonts} from "./modules/text.js";
import {planets, radiusMultiplier, gravityMultiplier, rotationMultiplier, atmosphereMultipier} from "./modules/planets.js";
import {playerMovement, colisions, gravity, moveCamera, movePlanets} from "./modules/movement.js"
import {keys,player,camera, units} from "./modules/objects.js";


function setup(){
    time = Date.now();
    setCanvas();
    window.onresize = setCanvas;
    requestAnimationFrame(loop);
}

function setupWithInactive(){
    let fonts = [];
    fonts["Teko"] = "Tahoma, Helvetica, sans-serif";
    fonts["Red Hat Mono"] = "'Courier New', Courier, monospace"
    console.error("failed to load fonts");
    useBackupFonts(fonts);
    setup();
}

function setCanvas(){
    let dpr = devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    canvas.width = (rect.width * dpr);
    canvas.height = (rect.height * dpr);
    c.scale(dpr, dpr);
    units.xmax = (rect.width/2);
    units.ymax = (rect.height/2);
    c.translate(units.xmax, units.ymax);
}

document.body.addEventListener("keydown", (e)=>{
    switch (e.key) {
        case "w":
        case "ArrowUp":
            keys.up = true;
        case "s":
        case "ArrowDown":
            keys.down = true;
            break;
        case "a":
        case "ArrowLeft":
            keys.left = true;
            break;
        case "d":
        case "ArrowRight":
            keys.right = true;
            break;
        case " ":
            keys.space = true;
            break;
        default:
            break;
    }
});
document.body.addEventListener("keyup", (e)=>{
    switch (e.key) {
        case "w":
        case "ArrowUp":
            keys.up = false;
            break;
        case "s":
        case "ArrowDown":
            keys.down = false;
            break;
        case "a":
        case "ArrowLeft":
            keys.left = false;
            break;
        case "d":
        case "ArrowRight":
            keys.right = false;
            break;
        case " ":
            keys.space = false;
            break;
    }
});

function loop(){
    let change = Date.now() - time;
    update(change);
    render();
    time = Date.now();
    requestAnimationFrame(loop);
}

function update(change){
    movePlanets(planets,change,rotationMultiplier);
    gravity(player,planets,units,radiusMultiplier, gravityMultiplier);
    playerMovement(change,player,keys);
    colisions(player,planets,units,radiusMultiplier);
    moveCamera(player,camera,change);
    render();
}

let stars = [];
for(let i = 0; i<90000; i++){
    let obj = {x: Math.random(), y: Math.random(),alpha:Math.random()};
    stars.push(obj);
}

function render(){
    c.clearRect(-units.xmax,-units.ymax, canvas.width,canvas.height)
    let universe = c.createLinearGradient(0,-units.ymax, units.xmax + 200,0);
    universe.addColorStop(0, "#110218");
    universe.addColorStop(.33, "#0a0a24");
    universe.addColorStop(.9, "#090212");
    universe.addColorStop(1, "#01110b");
    c.fillStyle = universe;
    c.fillRect(-units.xmax,-units.ymax,canvas.width,canvas.height);
    c.fillStyle = "white";
    c.save();
    stars.forEach((star,num)=>{
        let xPos = ((star.x * 3500) - 3500/2) * 2;
        let yPos = ((star.y * 3500) - 3500/2) * 2;
        let size;
        if(num % 100 === 0){
            xPos -= camera.x/10;
            yPos -= camera.y/10;
            size = 1.25;
        } else if (num % 50 === 0) {
            xPos -= camera.x/18;
            yPos -= camera.y/18;
            size = 1;
        } else if (num % 6 === 0){
            xPos -= camera.x/36;
            yPos -= camera.y/36;
            size = .75;
        } else {
           xPos -= camera.x/42;
           yPos -= camera.y/42;
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

    renderPlanets(c,planets,camera,units,radiusMultiplier, gravityMultiplier, atmosphereMultipier);
    renderPlayer(c,player,camera,keys,units);
    renderNavTools(c,player,camera,planets,text,units,radiusMultiplier);
}
