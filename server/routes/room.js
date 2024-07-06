const router = require('express').Router();
const roomController = require('../controllers/roomsController');

router.get('/active', roomController.getAllRoomsActive);
router.post('/active', roomController.getActiveRoom);
router.get('/', roomController.getRooms);
router.get('/roomId=:id', roomController.getRoom);
router.get('/ownerId=:id', roomController.getRoomsOwner);
router.get('/guestId=:id', roomController.getRoomsGuest);
router.get('/id=:id/isFull', roomController.isRoomFull);
router.put('/id=:id', roomController.updateRoom);
router.delete('/id=:id', roomController.deleteRoom);
router.post('/create', roomController.createRoom);
router.get('/id=:id/guests', roomController.getRoomGuests);
router.get('/id=:id/historyGuests', roomController.getRoomHistoryGuests)

module.exports = router