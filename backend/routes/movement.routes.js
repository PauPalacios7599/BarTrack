const express = require('express')
const router = express.Router()
const {
  createMovement,
  getAllMovements,
  getTopSalidas
} = require('../controllers/movement.controller')

const { verifyToken } = require('../middlewares/auth.middleware')

// Obtener historial de movimientos
router.get('/', verifyToken, getAllMovements)

// Registrar un nuevo movimiento
router.post('/', verifyToken, createMovement)

// Obtener producto con más salida
router.get('/mas-vendidos', verifyToken, getTopSalidas)

module.exports = router
