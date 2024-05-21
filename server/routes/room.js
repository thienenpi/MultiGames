const router = require('express').Router();
const roomController = require('../controllers/roomsController');

router.get('/active', roomController.getActiveRoom);
router.get('/', roomController.getRooms);
router.get('/roomId=:id', roomController.getRoom);
router.get('/ownerId=:id', roomController.getRoomsOwner);
router.put('/id=:id', roomController.updateRoom);
router.delete('/id=:id', roomController.deleteRoom);
router.post('/create', roomController.createRoom);

module.exports = router