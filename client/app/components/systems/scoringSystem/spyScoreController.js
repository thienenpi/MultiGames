import { SPY_GAME_MONEY } from "../../../constants";
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

class SpyScoreController {
  constructor() {
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
    console.log(player.name + " joined the game");
  }

  async updateMoneyForPlayers(playerIDs, status) {
    const money =
      status === "spy_win"
        ? SPY_GAME_MONEY.SPY_WIN_MONEY
        : SPY_GAME_MONEY.CIVILIAN_WIN_MONEY;

    const updatePromises = playerIDs.map(async (id) => {
      const player = this.players.find(player => player._id === id);
      
      if (player) {
        player.money += money;
        try {
          await updateUserInfo({
            id: player._id,
            data: { money: player.money },
          });
          console.log(`Updated money for player ${player.name}`);
        } catch (error) {
          console.error(`Failed to update money for player ${player.name}:`, error);
        }
      } else {
        console.error(`Player with ID ${id} not found`);
      }
    });

    await Promise.all(updatePromises);
  }
}

export default SpyScoreController;