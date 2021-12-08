
export let player = {
    direction: 180,
    speed: 0,
    engineSpeed: 3.15,
    boosterSpeed: 4,
    x: 0,
    y: 0,
    rotationMomentum: 0,
    xMomentum: 0,
    yMomentum: 0,
    xGravity: 0,
    yGravity: 0,
    collisionRadius: 11,
    currentPlanet: {
        name: "",
        type: "",
        makeup: "",
        id: 0,
        distance: 0,
        gravity: {
            angle: 0,
            strength: 0,
            x: 0,
            y: 0,
        },
    },
    nearestPlanet: {
        distance: Infinity,
        id: null,
    },
    size: 32,
    speedMultiplier: 0,
}

export let camera = {
    x: 0,
    y: 0,
    xMomentum: 0,
    yMomentum: 0,
}

export let keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    q: false,
    e: false,
};