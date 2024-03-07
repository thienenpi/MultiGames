const router = require('express').Router()
const roleController = require('../controllers/rolesController')

router.post('/', roleController.createRole)

module.exports = router