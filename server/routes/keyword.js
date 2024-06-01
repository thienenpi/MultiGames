const router = require('express').Router();
const keywordController = require('../controllers/keywordController');

router.get('/', keywordController.getKeyWords);

module.exports = router;