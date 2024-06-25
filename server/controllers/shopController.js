const Shop = require("../models/Shop");

const getAllItemsShop = async (req, res) => {
    try {
        const items = await Shop.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json("Failed to retrieve items", error);
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await Shop.findById(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json("Failed to retrieve item", error);
    }
};

module.exports = { 
    getAllItemsShop,
    getItemById,
};