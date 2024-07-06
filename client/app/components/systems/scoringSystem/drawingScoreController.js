import { DRAWING_GAME_SCORE, DRAWING_GAME_MONEY } from "../../../constants";
import ApiManager from "../../../api/ApiManager";

const updateUserInfo = async ({ id, data }) => {
  try {
    const url = `/users/id=${id}`;
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

class DrawingScoreController {
  constructor() {
    this.players = [];
    this.drawPlayerId = "";
    this.guessCorrectedPlayerIds = [];
    this.count = 0;
  }

  setDrawPlayer(drawPlayerId) {
    this.drawPlayerId = drawPlayerId;
  }

  addPlayer(player) {
    player["score"] = 0;
    this.players.push(player);
    console.log(player.name + " joined the game");
  }

  removePlayer(player) {
    const index = this.players.indexOf(player);
    if (index > -1) {
      this.players.splice(index, 1);
      console.log(player.name + " left the game");
    }
  }

  resetTurn() {
    this.count = 0;
    this.guessCorrectedPlayerIds = [];
    this.drawPlayerId = "";
  }

  getScoreForDrawGuessGame(userId) {
    return this.players.find((player) => player._id === userId).score;
  }

  getAddedScoreInTurn(userId) {
    if (this.checkGuessCorrectedPlayer(userId)) {
      let index = this.guessCorrectedPlayerIds.indexOf(userId);
      switch (index) {
        case 0:
          return DRAWING_GAME_SCORE.WIN_TOP1_SCORE;
        case 1:
          return DRAWING_GAME_SCORE.WIN_TOP2_SCORE;
        case 2:
          return DRAWING_GAME_SCORE.WIN_TOP3_SCORE;
        case 3:
          return DRAWING_GAME_SCORE.WIN_TOP4_SCORE;
        case 4:
          return DRAWING_GAME_SCORE.WIN_TOP5_SCORE;
        case 5:
          return DRAWING_GAME_SCORE.WIN_TOP6_SCORE;
        default:
          return 0;
      }
    }
  }

  getCountCorrectGuesses() {
    return this.guessCorrectedPlayerIds.length;
  }

  checkGuessCorrectedPlayer(userId) {
    if (this.guessCorrectedPlayerIds.length === 0) {
      return false;
    }
    return this.guessCorrectedPlayerIds.includes(userId);
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
      if (player._id === userId) {
        switch (this.count) {
          case 1:
            player.score += DRAWING_GAME_SCORE.WIN_TOP1_SCORE;
            break;
          case 2:
            player.score += DRAWING_GAME_SCORE.WIN_TOP2_SCORE;
            break;
          case 3:
            player.score += DRAWING_GAME_SCORE.WIN_TOP3_SCORE;
            break;
          case 4:
            player.score += DRAWING_GAME_SCORE.WIN_TOP4_SCORE;
            break;
          case 5:
            player.score += DRAWING_GAME_SCORE.WIN_TOP5_SCORE;
            break;
          case 6:
            player.score += DRAWING_GAME_SCORE.WIN_TOP6_SCORE;
            break;
          default:
            player.score += 0;
            break;
        }

        this.players.forEach((player) => {
          if (player._id === this.drawPlayerId) {
            player.score += DRAWING_GAME_SCORE.GUESS_RIGHT_SCORE;
          }
        });
        this.guessCorrectedPlayerIds.push(userId);
      }
    });
  }

  // Method to display scores
  displayScores() {
    this.players.forEach((player) => {
      console.log(player.name + " - Score: " + player.score);
    });
  }

  updateMoneyForPlayers() {
    // Sort players by score from highest to lowest
    this.players.sort((a, b) => b.score - a.score);
    this.players.forEach(async (player, index) => {
      switch (index) {
        case 0:
          player.money += DRAWING_GAME_MONEY.WIN_TOP1_MONEY;
          break;
        case 1:
          player.money += DRAWING_GAME_MONEY.WIN_TOP2_MONEY;
          break;
        case 2:
          player.money += DRAWING_GAME_MONEY.WIN_TOP3_MONEY;
          break;
        default:
          player.money += DRAWING_GAME_MONEY.DEFAULT_MONEY;
          break;
      }
      await updateUserInfo({
        id: player._id,
        data: { money: player.money },
      });
    });
  }
}

export default DrawingScoreController;
