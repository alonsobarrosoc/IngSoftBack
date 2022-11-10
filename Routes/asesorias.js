const express = require('express')
const { getAsesoria } = require('../Controllers/asesoriasController')
const router = express.Router()

router.post('/get', getAsesoria)

exports.module = router