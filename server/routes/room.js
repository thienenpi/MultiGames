const router = require('express').Router();
const roomController = require('../controllers/roomsController');

router.post('/', roomController.createRoom);
router.get('/', roomController.getAllRooms);

module.exports = router;