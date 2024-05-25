import { Game_Mode, Spy_Game_Status, Drawing_Game_Status, SPY_GAME_TIME, DRAWING_GAME_TIME } from "../../../constants";


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

    // set time for each status in spy game
    setSpyGameTime() {
        if (this.status === Spy_Game_Status.WORD_VIEW) {
            this.time = SPY_GAME_TIME.WORD_VIEW_TIME;
        } else if (this.status === Spy_Game_Status.DESCRIPTION) {
            this.time = SPY_GAME_TIME.DESCRIPTION_TIME;
        } else if (this.status === Spy_Game_Status.VOTE) {
            this.time = SPY_GAME_TIME.VOTE_TIME;
        } else if (this.status === Spy_Game_Status.RESULT) {
            this.time = SPY_GAME_TIME.RESULT_TIME;
        }
    }

    // set next status in spy game
    setSpyGameNextStatus() {
        if (this.status === Spy_Game_Status.WORD_VIEW) {
            this.status = Spy_Game_Status.DESCRIPTION;
        } else if (this.status === Spy_Game_Status.DESCRIPTION) {
            this.status = Spy_Game_Status.VOTE;
        } else if (this.status === Spy_Game_Status.VOTE) {
            this.status = Spy_Game_Status.RESULT;
        } else if (this.status === Spy_Game_Status.RESULT) {
            this.status = Spy_Game_Status.WORD_VIEW;
        }
    }

    // set time for each status in drawing game
    setDrawingGameTime() {
        if (this.status === Drawing_Game_Status.WORD_SELECTION) {
            this.time = DRAWING_GAME_TIME.WORD_SELECTION_TIME;
        } else if (this.status === Drawing_Game_Status.DRAWING) {
            this.time = DRAWING_GAME_TIME.DRAWING_TIME;
        } else if (this.status === Drawing_Game_Status.RESULT) {
            this.time = DRAWING_GAME_TIME.RESULT_TIME;
        }
    }

    // set next status in drawing game
    setDrawingGameNextStatus() {
        if (this.status === Drawing_Game_Status.WORD_SELECTION) {
            this.status = Drawing_Game_Status.DRAWING;
        } else if (this.status === Drawing_Game_Status.DRAWING) {
            this.status = Drawing_Game_Status.RESULT;
        } else if (this.status === Drawing_Game_Status.RESULT) {
            this.status = Drawing_Game_Status.WORD_SELECTION;
        }
    }

    setNextStatusAndTime() {
        if (this.mode === Game_Mode.DRAWING) {
            this.setDrawingGameNextStatus();
            this.setDrawingGameTime();
        }
        else if (this.mode === Game_Mode.SPY) {
            this.setSpyGameNextStatus();
            this.setSpyGameTime();
        }
    }
}

export default GameTimeController;