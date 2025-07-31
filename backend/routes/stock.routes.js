const express = require('express')
const router = express.Router()
const {
  getAllStock,
  getStockById,
  getStockBajo,
  getStockPorCategoria
} = require('../controllers/stock.controller')

const { verifyToken } = require('../middlewares/auth.middleware')

// Lista de todos los productos
router.get('/', verifyToken, getAllStock)

// Productos con poco stock
router.get('/alertas/bajo-stock', verifyToken, getStockBajo)

// Productos por categoría
router.get('/categoria/buscar', verifyToken, getStockPorCategoria)

// Detalle de un producto
router.get('/:id', verifyToken, getStockById)

module.exports = router
