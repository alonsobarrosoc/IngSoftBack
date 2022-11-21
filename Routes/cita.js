const express = require('express')
const router - express.Router()
const { addCita, getCitas} = require('../Controllers/citaController')

router.post('/add', addCita)
router.post('/get', getCitas)


module.exports = router
