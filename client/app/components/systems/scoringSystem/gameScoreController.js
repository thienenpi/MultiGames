import {
  GAME_MODE,
  SPY_GAME_SCORE,
  DRAWING_GAME_SCORE,
} from "../../../constants";

class GameScoreController {
  constructor() {
    this.players = [];
    this.drawPlayerId = "";
    this.guessCorrectedPlayerIds = [];
    this.count = 0;
  }

  setDrawPlayer(drawPlayerId) {
    this.drawPlayerId = drawPlayerId;
  }

  removeDrawPlayer() {
    this.drawPlayerId = "";
  }

  addPlayer(player) {
    player["score"] = 0;
    this.players.push(player);
    console.log(player["name"] + " joined the game");
  }

  removePlayer(player) {
    const index = this.players.indexOf(player);
    if (index > -1) {
      this.players.splice(index, 1);
      console.log(player["name"] + " left the game");
    }
  }

  resetTurn() {
    this.count = 0;
    this.guessCorrectedPlayerIds = [];
    this.drawPlayerId = "";
  }

  getScoreForDrawGuessGame(userId) {
    // if (this.drawPlayerId === userId) {
    //   const drawPlayer = this.players.find((player) => player['_id'] === userId);
    //   drawPlayer['score'] += DRAWING_GAME_SCORE.GUESS_RIGHT * this.count;
    //   return drawPlayer['score'];
    // }
    return this.players.find((player) => player["_id"] === userId)["score"];
  }

  // Method to check guess correctness for "Vẽ hình đoán chữ"
  calculateScoreForDrawGuessGame(userId) {
    // If the role is drawPlayer, then do not calculate the score
    if (this.drawPlayerId === userId) {
      return;
    }

    // If the role is guessPlayer, then check for correct guesses
    if (this.guessCorrectedPlayerIds.length > 0) {
      this.guessCorrectedPlayerIds.forEach((guessCorrectedPlayerId) => {
        if (guessCorrectedPlayerId === userId) {
          return;
        }
      });
    }

    this.count++;
    this.players.forEach((player) => {
      if (player["_id"] === userId) {
        switch (this.count) {
          case 1:
            player["score"] += DRAWING_GAME_SCORE.WIN_TOP1;
            break;
          case 2:
            player["score"] += DRAWING_GAME_SCORE.WIN_TOP2;
            break;
          case 3:
            player["score"] += DRAWING_GAME_SCORE.WIN_TOP3;
            break;
          case 4:
            player["score"] += DRAWING_GAME_SCORE.WIN_TOP4;
            break;
          case 5:
            player["score"] += DRAWING_GAME_SCORE.WIN_TOP5;
            break;
          case 6:
            player["score"] += DRAWING_GAME_SCORE.WIN_TOP6;
            break;
          default:
            player["score"] += 0;
            break;
        }
        this.players.forEach((player) => {
          if (player["_id"] === this.drawPlayerId) {
            player["score"] += DRAWING_GAME_SCORE.GUESS_RIGHT;
          }
        });
        this.guessCorrectedPlayerIds.push(userId);
      }
    });
  }

  displayScores() {
    this.players.forEach((player) => {
      console.log(player["name"] + " - Score: " + player["score"]);
    });
  }
}

export default GameScoreController;
