

export let radiusMultiplier = 15;
export let gravityMultiplier = 1.8;
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
        id: 0,
        size: 28,
        x: 0,
        y: 500,
        rotation: 0,
        orbitX: 0,
        orbitY: 0,
        name: "I-Pasiphaë",
        type: " ",
        makeup: " ",
        fill: {type: "gradient", f: {
            stop1: {s:0,c:"aqua"},
            stop2:{s:1,c:"blue"},
        }},
        stroke: "white",
        atmosphere: "aqua"
    },
    "1":{
        id: 1,
        size: 30,
        x: 3000,
        y: -1000,
        rotation: 0,
        orbitX: 0,
        orbitY: 0,
        name: "Argo",
        type: " ",
        makeup: " ",
        fill: {type: "gradient", f: {
            stop1: {s:0,c:"darkred"},
            stop2:{s:1,c:"orange"},
        }},
        stroke: "white",
        atmosphere: "orange"
    },
    "2":{
        id: 2,
        size: 26,
        x: 6000,
        y: -4300,
        rotation: 0,
        orbitX: 0,
        orbitY: 0,
        name: "Lamiai Z4",
        type: " ",
        makeup: " ",
        fill: {type: "gradient", f: {
            stop1: {s:0,c:"indigo"},
            stop2:{s:1,c:"steelblue"},
        }},
        stroke: "white",
        atmosphere: "indigo"
    },
    "3":{
        id: 3,
        size: 22,
        x: -2300,
        y: 1100,
        rotation: 0,
        orbitX: 0,
        orbitY: 0,
        name: "Alkyonides 18-89",
        type: " ",
        makeup: " ",
        fill: {type: "gradient", f: {
            stop1: {s:0,c:"wheat"},
            stop2:{s:1,c:"rosybrown"},
        }},
        stroke: "white",
        atmosphere: "sandybrown"
    },
}