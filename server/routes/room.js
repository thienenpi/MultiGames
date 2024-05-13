const router = require('express').Router();
const roomController = require('../controllers/roomsController');

router.post('/', roomController.createRoom);

module.exports = router;