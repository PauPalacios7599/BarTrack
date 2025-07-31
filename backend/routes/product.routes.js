const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller')

const { verifyToken, isAdmin } = require('../middlewares/auth.middleware')

// Rutas públicas o protegidas según el caso
router.get('/', verifyToken, getAllProducts)
router.get('/:id', verifyToken, getProductById)

// Solo admin puede crear, actualizar o eliminar productos
router.post('/', verifyToken, isAdmin, createProduct)
router.put('/:id', verifyToken, isAdmin, updateProduct)
router.delete('/:id', verifyToken, isAdmin, deleteProduct)

module.exports = router
