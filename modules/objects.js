
export let player = {
    direction: 180,
    speed: 0,
    engineSpeed: 3.25,
    boosterSpeed: 4.5,
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

export let units = {
    xmax: 0,
    ymax: 0,
    toRad: function(degrees){
        let radians = degrees * Math.PI / 180;
        return radians;
    },
    toDeg: function(radians){
        let degrees = radians /( Math.PI/180);
        return degrees;
    },
    distance: function(x1,y1,x2,y2){
        return Math.sqrt(((x1-x2)**2) + ((y1-y2)**2));
    }
}