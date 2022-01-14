import {AnimationHandler} from "../animators.js"
import { camera, player } from "../objects.js";
export class ParticleEmmitter {
    particles = [];
    x = 0;
    y = 0;
    areaSpread = 0;
    angle = 0;
    angleSpread = 0;
    minVelocity = 0;
    maxVelocity = 0
    drag = 0;
    minFlowRate = 0;
    maxFlowRate = 0;
    minLife = 0;
    maxLife = 0;
    variations = 0;
    renderer;
    constructor (x,y, renderer, options = {}) {
        this.x = x;
        this.y = y;
        this.renderer = renderer;
        this.areaSpread = options.areaSpread || 0;
        this.minFlowRate = options.flow || options.minFlowRate || 1;
        this.maxFlowRate = options.flow || options.maxFlowRate || 1;
        this.angle = options.angle || 0;
        this.angleSpread = options.angleSpread || 0;
        this.minVelocity = options.velocity || options.minVelocity || 0;
        this.maxVelocity = options.velocity || options.maxVelocity || 0;
        this.drag = options.drag || 0;
        this.minLife = options.life || options.minLife || 100;
        this.maxLife = options.life || options.maxLife || 100;
        this.uWC = options.useWorldCoords || false;
        this.uPC = options.usePlayerCoords || false;
        this.variations = 1;
    }
    emit (movementData = {}) {
        let flow = (Math.random() * (this.maxFlowRate - this.minFlowRate + 1)) + this.minFlowRate
        for (let i = 0; i < flow; i++) {
            let variation = Math.floor(Math.random() * this.variations)
            let spreadX = (Math.random() * (this.areaSpread)) - this.areaSpread/2;
            let spreadY = (Math.random() * (this.areaSpread)) - this.areaSpread/2;
            let angleDisplacement = (Math.random() * this.angleSpread) - this.angleSpread/2;
            let velocity = (Math.random() * (this.maxVelocity - this.minVelocity + 1)) + this.minVelocity;
            let angle = this.angle+angleDisplacement

            let life = (Math.random() * (this.maxLife - this.minLife + 1)) + this.minLife;     
            let particle = new Particle(life, variation, this.x + spreadX,this.y + spreadY, this.usingWorldCoordinates,angle,-Math.sin(angle) * velocity,Math.cos(angle) * velocity,this.drag);
            this.particles.push(particle);
        }
        
    }
    render () {
        this.particles.forEach((particle, index)=>{
            if (particle.animation.animation.done) {
                this.particles.splice(index, 1);
            } else {
                let x = particle.x;
                x -= this.uWC ? 0 : camera.x ;
                x += this.uPC ? player.x : 0;

                let y = particle.y;
                y -= this.uWC ? 0 : camera.y;
                y += this.uPC ? player.y : 0;
                
                let movementData = {
                    xVelocity: particle.xVelocity,
                    yVelocity: particle.yVelocity,
                    direction: particle.angle,
                    drag: particle.drag,
                };
                this.renderer(particle.animation.animation.value, x, y, movementData);
            }
        });
    }
    move (x , y){
        this.x = x;
        this.y = y;
    }
}

export class Particle {
    life = 0;
    variation =0;
    x = 0;
    y = 0;
    angle = 0;
    xVelocity = 0;
    yVelocity = 0
    drag = 0;
    usingWorldCoords;
    animation;
    constructor (life, variation, x, y, usingWorldCoords, angle, xVelocity, yVelocity, drag){
        this.life = life;
        this.variation = variation;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.drag = drag;
        this.usingWorldCoords = usingWorldCoords;
        this.animation = AnimationHandler.create("",0,1,life, {immediate: true});
    }
}