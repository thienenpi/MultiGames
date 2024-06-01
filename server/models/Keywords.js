const mongoose = require("mongoose");

const KeywordSchema = new mongoose.Schema(
    {
    keywordID: { type: String, required: true },
    keyword: { type: String, required: true },
    difficultLevel: { type: Number, required: true },
    category: { type: String, required: true },
    suggestionList: { type: Array, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Keyword", KeywordSchema);