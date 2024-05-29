const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/getMessages/:userId/:friendId', messageController.getMessages);
router.post('/sendMessage', messageController.sendMessage);


module.exports = router;
