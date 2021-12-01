

export let radiusMultiplier = 15;
export let gravityMultiplier = 1.6;
export let rotationMultiplier = 10;
export let atmosphereMultipier = 2;

/*
 * size: number
 * x: number
 * y: number
 * rotation: number
 * orbitX: number (offsets the planet from the center of its roation, so it appears to orbit)
 * orbitY: number
 * name: string
 * type: string
 * makeup: string
 * fill:
 * { 
 *  type: "gradient" || "color" || "img"
 *  f: "color" || img-element || {stop: {s: number, c: "color"} ...}}
 * atmosphere: "color"
*/
export let planets = {
    "A": {
        size: 28,
        x: 1000,
        y: 4000,
        rotation: 0,
        orbitX: 0,
        orbitY: 0,
        name: "Alex's Automotive",
        type: " ",
        makeup: " ",
        fill: {type: "gradient", f: {
            stop1: {s:0,c:"blue"},
            stop2:{s:1,c:"white"},
        }},
        stroke: "white",
        atmosphere: "hsla(200,40%,20%,0.8)",
    },
}