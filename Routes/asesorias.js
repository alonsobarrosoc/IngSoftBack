const express = require('express')
const { getAsesoria, deleteAsesoria, putAsesoria, newAsesoria } = require('../Controllers/asesoriasController')
const router = express.Router()

router.post('/get', getAsesoria)
router.delete('/delete', deleteAsesoria)
router.put('/update', putAsesoria)
router.post('/add', newAsesoria)

module.exports = router
