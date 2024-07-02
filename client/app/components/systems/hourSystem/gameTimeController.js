import { 
    GAME_MODE,
    SPY_GAME_STATUS,
    DRAWING_GAME_STATUS,
    SPY_GAME_TIME,
    DRAWING_GAME_TIME,
    GENERAL_GAME_TIME,
} from "../../../constants";


class GameTimeController {
    constructor() {
        this.time = 0;
        this.timeSpeed = 1;
        this.timePaused = false;
        this.mode = '';
        this.status = '';
        this.checkUpdateTime = GENERAL_GAME_TIME.CHECK_UPDATE_TIME * 1000; // 5000 ms
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
        this.mode = GAME_MODE.DRAWING;
        this.status = DRAWING_GAME_STATUS.WORD_SELECTION;
        this.time = DRAWING_GAME_TIME.WORD_SELECTION_TIME;
    }

    setModeSpy() {
        this.mode = GAME_MODE.SPY;
        this.status = SPY_GAME_STATUS.WORD_VIEW;
        this.time = SPY_GAME_TIME.WORD_VIEW_TIME;
    }

    getStatus() { return this.status; }

    setStatus(status) {
        this.status = status;
    }

    getCheckUpdateTime() {
        return this.checkUpdateTime;
    }

    setCheckUpdateTime(time) {
        this.checkUpdateTime = time;
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
        if (this.status === SPY_GAME_STATUS.WORD_VIEW) {
            this.time = SPY_GAME_TIME.WORD_VIEW_TIME;
        } else if (this.status === SPY_GAME_STATUS.DESCRIPTION) {
            this.time = SPY_GAME_TIME.DESCRIPTION_TIME;
        } else if (this.status === SPY_GAME_STATUS.VOTE) {
            this.time = SPY_GAME_TIME.VOTE_TIME;
        } else if (this.status === SPY_GAME_STATUS.RESULT) {
            this.time = SPY_GAME_TIME.RESULT_TIME;
        }
    }

    // set next status in spy game
    setSpyGameNextStatus() {
        if (this.status === SPY_GAME_STATUS.WORD_VIEW) {
            this.status = SPY_GAME_STATUS.DESCRIPTION;
        } else if (this.status === SPY_GAME_STATUS.DESCRIPTION) {
            this.status = SPY_GAME_STATUS.VOTE;
        } else if (this.status === SPY_GAME_STATUS.VOTE) {
            this.status = SPY_GAME_STATUS.RESULT;
        } else if (this.status === SPY_GAME_STATUS.RESULT) {
            this.status = SPY_GAME_STATUS.DESCRIPTION;
        }
    }

    // set time for each status in drawing game
    setDrawingGameTime() {
        if (this.status === DRAWING_GAME_STATUS.WORD_SELECTION) {
            this.time = DRAWING_GAME_TIME.WORD_SELECTION_TIME;
        } else if (this.status === DRAWING_GAME_STATUS.DRAWING) {
            this.time = DRAWING_GAME_TIME.DRAWING_TIME;
        } else if (this.status === DRAWING_GAME_STATUS.RESULT) {
            this.time = DRAWING_GAME_TIME.RESULT_TIME;
        }
    }

    // set next status in drawing game
    setDrawingGameNextStatus() {
        if (this.status === DRAWING_GAME_STATUS.WORD_SELECTION) {
            this.status = DRAWING_GAME_STATUS.DRAWING;
        } else if (this.status === DRAWING_GAME_STATUS.DRAWING) {
            this.status = DRAWING_GAME_STATUS.RESULT;
        } else if (this.status === DRAWING_GAME_STATUS.RESULT) {
            this.status = DRAWING_GAME_STATUS.WORD_SELECTION;
        }
    }

    setNextStatusAndTime() {
        if (this.mode === GAME_MODE.DRAWING) {
            this.setDrawingGameNextStatus();
            this.setDrawingGameTime();
        }
        else if (this.mode === GAME_MODE.SPY) {
            this.setSpyGameNextStatus();
            this.setSpyGameTime();
        }
    }
}

export default GameTimeController;