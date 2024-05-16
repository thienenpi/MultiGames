const router = require('express').Router();
const roomController = require('../controllers/roomsController');

router.get('/', roomController.getRooms);
router.get('/:id', roomController.getRoom);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);
router.post('/create', roomController.createRoom);
router.get('/:id/active-games', roomController.roomActiveGamesGet);

module.exports = router;