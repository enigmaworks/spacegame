
export let player = {
    direction: 180,
    speed: 0,
    engineSpeed: 2.15,
    boosterSpeed: 3,
    x: 0,
    y: 0,
    rotationMomentum: 0,
    xMomentum: 0,
    yMomentum: 0,
    xGravity: 0,
    yGravity: 0,
    angle: 0,
    currentPlanet: "",
    currentType: "",
    currentMakeup: "",
    collisionRadius: 11,
    size: 30,
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