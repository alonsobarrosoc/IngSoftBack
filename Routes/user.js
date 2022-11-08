const express = require('express')
const { newUser, findWithoutPhoto, findPhoto, login } = require('../Controllers/userController')
const router = express.Router()


router.post('/add', newUser)
router.post('/find', findWithoutPhoto)
router.post('/login', login)

router.get('/find-photo', findPhoto)




module.exports = router;
