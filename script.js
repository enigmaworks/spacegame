let canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.id = "canvas";

let c = canvas.getContext("2d");
let time;

let destinationSelect = document.querySelector("select")

WebFont.load({
    google: {
      families: ["Teko:300","Red+Hat+Mono:400"]
    },
    timeout: 3000,
    active: setup,
    fontinactive: setupWithInactive,
});


import { minimap} from "./modules/renderers/minimap.js";
import { renderNavTools} from "./modules/renderers/navui.js";
import { renderPlanets} from "./modules/renderers/planet.js";
import { renderPlayer} from "./modules/renderers/player.js";
import { renderStars} from "./modules/renderers/stars.js";

import {
    roundedRect,
    text,
    useBackupFonts,
    units,
} from "./modules/utils.js";

import {
    planets,
    radiusMultiplier,
    gravityMultiplier,
    rotationMultiplier,
    atmosphereMultipier
} from "./modules/planets.js";

import {
    playerMovement,
    colisions,
    gravity,
    moveCamera,
    movePlanets
} from "./modules/movement.js";

import {
    keys,
    player,
    camera
} from "./modules/objects.js";



function setup(){
    time = Date.now();
    setCanvas();
    window.onresize = setCanvas;
    requestAnimationFrame(loop);
    planets.forEach((planet, id)=>{
        let option = document.createElement("option");
        option.innerText = planet.name;
        option.value = id;
        destinationSelect.appendChild(option);
    });
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
function render(){
    c.clearRect(-units.xmax,-units.ymax, canvas.width,canvas.height)
    let universe = c.createLinearGradient(0,-units.ymax, units.xmax + 200,0);
    universe.addColorStop(0, "#110218");
    universe.addColorStop(.33, "#0a0a24");
    universe.addColorStop(.9, "#090212");
    universe.addColorStop(1, "#01110b");
    c.fillStyle = universe;
    c.fillRect(-units.xmax,-units.ymax,canvas.width,canvas.height);

    renderStars(c,camera, units);
    renderPlanets(c,planets,camera,units,radiusMultiplier, gravityMultiplier, atmosphereMultipier);
    renderPlayer(c,player,camera,keys,units);
    minimap({size: 100, offset: 15, zoom: 25}, parseInt(destinationSelect.value),c,player,camera,planets,text,units,radiusMultiplier, gravityMultiplier);
    renderNavTools(c,player,camera,planets,parseInt(destinationSelect.value),text,units,radiusMultiplier);
}
