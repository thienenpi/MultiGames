const router = require('express').Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getAllItemsShop);
router.get('/id=:id', shopController.getItemById);

module.exports = router;