const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/getMessages/:userId/:friendId', messageController.getMessages);
router.post('/sendMessage', messageController.sendMessage);
router.get("/unread-count/:userId/:friendId", messageController.getUnreadMessagesCount);

module.exports = router;
