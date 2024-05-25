import { Game_Mode, Spy_Game_Status, Drawing_Game_Status } from "../../../constants";


class GameTimeController {
    constructor() {
        this.time = 0;
        this.timeSpeed = 1;
        this.timePaused = false;
        this.mode = '';
        this.status = '';
    }

    getTime() {
        return this.time;
    }

    setTime(time) {
        this.time = time;
    }

    getTimeSpeed() {
        return this.timeSpeed;
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

    getMode() { return this.mode; }

    setMode(mode) {
        this.mode = mode;
    }

    setModeDrawing() {
        this.mode = Game_Mode.DRAWING;
    }

    setModeSpy() {
        this.mode = Game_Mode.SPY;
    }

    getStatus() { return this.status; }

    setStatus(status) {
        this.status = status;

        if (this.mode === Game_Mode.DRAWING) {
            this.setDrawingGameTime();
        }
        else if (this.mode === Game_Mode.SPY) {
            this.setSpyGameTime();
        }
    }

    resetTime() {
        this.time = 0;
    }

    timeDown() {
        if (!this.timePaused) {
            if (this.time <= 0) {
                this.time = 0;
                return;
            }
            this.time -= 1;
        }
    }

    setDrawingGameTime() {
        if (this.status === Drawing_Game_Status.WAITING) {
            this.time = 10;
        } else if (this.status === Drawing_Game_Status.WORD_SELECTION) {
            this.time = 10;
        } else if (this.status === Drawing_Game_Status.DRAWING) {
            this.time = 60;
        } else if (this.status === Drawing_Game_Status.RESULT) {
            this.time = 10;
        }
    }

    setSpyGameTime() {
        if (this.status === Spy_Game_Status.WAITING) {
            this.time = 10;
        } else if (this.status === Spy_Game_Status.WORD_VIEW) {
            this.time = 10;
        } else if (this.status === Spy_Game_Status.DESCRIPTION) {
            this.time = 60;
        } else if (this.status === Spy_Game_Status.VOTE) {
            this.time = 10;
        } else if (this.status === Spy_Game_Status.RESULT) {
            this.time = 10;
        }
    }
}

export default GameTimeController;