export class Animation {
    constructor(
        initial,
        goal,
        time,
        oncomplete = () => {},
        repeat = false,
        reverseOnEnd = false
    ) {
        this.startingValue = initial;
        this.endingValue = goal;
        this.animationLength = time;
        this.oncomplete = oncomplete;
        this.doesRepeat = repeat;
        this.doesReverse = reverseOnEnd;
        this.stepSize = (goal - initial) / time;
        this.direction = 1;
        this.animationValue = initial;
        this.percentComplete = 0;
        this.done = false;
    }
    step(delta) {
        if (this.done) return;
        this.animationValue += this.stepSize * delta * this.direction;
        if (
            this.animationValue >= this.endingValue ||
            this.animationValue <= this.startingValue
        ) {
            if (this.doesRepeat) {
                if (this.doesReverse) {
                    this.direction *= -1;
                    if (this.animationValue >= this.endingValue) {
                        this.animationValue = this.endingValue;
                    } else {
                        this.animationValue = this.startingValue;
                    }
                } else {
                    this.animationValue = this.startingValue;
                }
            } else {
                this.animationValue = this.endingValue;
                this.stepSize = 0;
                this.done = true;
                this.oncomplete();
            }
        }
        this.percentComplete = this.endingValue / this.animationValue / 100;
    }
    reset() {
        this.animationValue = this.startingValue;
        this.done = false;
        this.percentComplete = 0;
    }
    get value() {
        return this.animationValue;
    }
}

export let AnimationHandler = {
    running: [],
    all: [],
    create(name, start, end, length, options = {}) {
        let loop = options.loop || false;
        let smoothLoop = options.smoothLoop || false;
        let immediate = options.immediate || false;
        let onEnd = options.onEnd || function () {};

        let animation = new Animation(
            start,
            end,
            length,
            onEnd,
            loop,
            smoothLoop
        );
        let animationObject = {
            name: name,
            animation: animation,
        };

        this.all.push(animationObject);
        if (immediate) AnimationHandler.trigger(animationObject);
        return animationObject;
    },
    trigger(animationObject) {
        animationObject.animation.reset();
        this.running.push(animationObject);
    },
    delete(animationObject) {
        if (this.running.includes(animationObject)) {
            this.running.splice(this.running.indexOf(animationObject), 1);
        }
        this.all.splice(this.running.indexOf(animationObject), 1);
    },
    cancel(animationObject, triggerOnEndFunction = false) {
        if (this.running.includes(animationObject)) {
            if (triggerOnEndFunction) animationObject.animation.oncomplete();
            this.running.splice(this.running.indexOf(animationObject), 1);
        }
    },
    stepAll(change) {
        this.running.forEach((animationObject) => {
            animationObject.animation.step(change);
            if (animationObject.animation.done) {
                this.cancel(animationObject);
            }
        });
    },
};
