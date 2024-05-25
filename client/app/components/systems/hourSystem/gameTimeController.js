class GameTimeController {
    constructor() {
        this.time = 0;
        this.timeSpeed = 1;
        this.timePaused = false;
    }

    getTime() {
        return this.time;
    }

    setTimeSpeed(speed) {
        this.timeSpeed = speed;
    }

    pauseTime() {
        this.timePaused = true;
    }

    resumeTime() {
        this.timePaused = false;
    }

    resetTime() {
        this.time = 0;
    }

    updateTime() {
        if (!this.timePaused) {
            this.time -= this.timeSpeed;
        }
    }

    setTime(time) {
        this.time = time;
    }
}

export { GameTimeController };