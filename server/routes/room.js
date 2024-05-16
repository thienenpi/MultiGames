const router = require('express').Router();
const roomController = require('../controllers/roomsController');

router.get('/active', roomController.getRoomActive);
router.get('/', roomController.getRooms);
router.get('/room_id=:id', roomController.getRoom);
router.put('/room_id=:id', roomController.updateRoom);
router.delete('/room_id=:id', roomController.deleteRoom);
router.post('/create', roomController.createRoom);

module.exports = router