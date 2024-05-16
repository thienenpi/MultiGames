const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/usersController');

router.post('/login/', authController.login);
router.post('/register/', authController.register);

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);


module.exports = router;
