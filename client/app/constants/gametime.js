// General Game Time
const GENERAL_GAME_TIME = {
    WAITING_TIME: 5, // Thời gian chờ trong 5 giây
    RESULT_TIME: 8, // Thời gian hiển thị kết quả trong 20 giây
    CHECK_UPDATE_TIME: 5, // Thời gian kiểm tra cập nhật trong 5 giây
};

// Spy Game Time
const SPY_GAME_TIME = {
    WORD_VIEW_TIME: 5, // Thời gian xem từ trong 5 giây
    DESCRIPTION_TIME: 20, // Thời gian mô tả trong 40 giây
    VOTE_TIME: 10, // Thời gian vote trong 15 giây
    RESULT_TIME: GENERAL_GAME_TIME.RESULT_TIME, // Thời gian hiển thị kết quả trong 20 giây
};

// Drawing Game Time
const DRAWING_GAME_TIME = {
    WORD_SELECTION_TIME: 5, // Thời gian chọn từ trong 15 giây
    DRAWING_TIME: 5, // Thời gian vẽ trong 70 giây
    RESULT_TIME: GENERAL_GAME_TIME.RESULT_TIME, // Thời gian hiển thị kết quả trong 20 giây
};

export { SPY_GAME_TIME, DRAWING_GAME_TIME, GENERAL_GAME_TIME };