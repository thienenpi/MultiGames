import {
    SPY_GAME_MONEY,
} from "../../../constants";
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
    constructor() {}

    async updateMoneyForPlayers(players, status) {
        const money = status === "spy_win" ? SPY_GAME_MONEY.SPY_WIN_MONEY : SPY_GAME_MONEY.CIVILIAN_WIN_MONEY;
        for (const player of players) {
            player.money += money;
            await updateUserInfo({
                id: player._id,
                data: { money: player.money },
            });
        }
    }
}

export default SpyScoreController;