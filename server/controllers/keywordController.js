const Keyword = require('../models/Keywords');

const getKeyWords = async (req, res) => {
    try {
        const keywords = await Keyword.find();
        res.status(200).json(keywords);
    } catch (error) {
        res.status(500).json('Failed to fetch keywords', error);
    }
};

module.exports = { 
    getKeyWords, 
};


