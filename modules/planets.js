let img = document.createElement("img");
img.src = "../imgs/venustile.png";

export let radiusMultiplier = 22;
export let gravityMultiplier = 1.8;
export let rotationMultiplier = 10;
export let atmosphereMultipier = 1.8;

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
export let planets = [
    {
        size: 28,
        x: 0,
        y: 500,
        rotation: 0,
        orbitX: 0,
        orbitY: 0,
        name: "I-Pasiphaë",
        type: "",
        makeup: "",
        fill: {type: "gradient", f: {
            stop1: {s:0,c:"aqua"},
            stop2:{s:1,c:"blue"},
        }},
        stroke: "white",
        atmosphere: "aqua"
    },
    {
        size: 30,
        x: 4000,
        y: -1500,
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
    {
        size: 26,
        x: 6000,
        y: -6300,
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
    {
        size: 22,
        x: -4300,
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
    {
        size: 32,
        x: 2222,
        y: -5555,
        rotation: 0,
        orbitX: 0,
        orbitY: 0,
        name: "Frank's",
        type: "",
        makeup: "",
        fill: {type: "gradient", f: {
            stop1: {s:0,c:"darkgreen"},
            stop2:{s:1,c:"green"},
        }},
        stroke: "white",
        atmosphere: "green"
    },
    {
        size: 39,
        x: 9999,
        y: -9999,
        rotation: 0,
        orbitX: 0,
        orbitY: 0,
        name: "Styx",
        type: "",
        makeup: "",
        fill: {type: "gradient", f: {
            stop1: {s:0,c:"teal"},
            stop2:{s:1,c:"darkturquoise"},
        }},
        stroke: "white",
        atmosphere: "teal"
    },
    {
        size: 19,
        x: 1,
        y: 10600,
        rotation: 0,
        orbitX: 0,
        orbitY: 0,
        name: "Venus",
        type: "",
        makeup: "",
        fill: {type: "img", f: img},
        stroke: "white",
        atmosphere: "orange"
    },
    
]