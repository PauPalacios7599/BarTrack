const Product = require('../models/Product')

// Obtener todo el stock
const getAllStock = async (req, res) => {
  try {
    const productos = await Product.find(
      {},
      'nombre categoria unidad stock_actual stock_minimo'
    )
    res.json(productos)
  } catch (error) {
    console.error('❌ Error al obtener stock:', error)
    res.status(500).json({ message: 'Error al consultar el stock' })
  }
}

// Obtener stock por ID de producto
const getStockById = async (req, res) => {
  try {
    const { id } = req.params
    const producto = await Product.findById(
      id,
      'nombre categoria unidad stock_actual stock_minimo'
    )
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.json(producto)
  } catch (error) {
    console.error('❌ Error al consultar producto:', error)
    res.status(500).json({ message: 'Error al consultar el producto' })
  }
}

// Obtener productos con stock bajo
const getStockBajo = async (req, res) => {
  try {
    const productos = await Product.find(
      { $expr: { $lt: ['$stock_actual', '$stock_minimo'] } },
      'nombre categoria unidad stock_actual stock_minimo'
    )
    res.json(productos)
  } catch (error) {
    console.error('❌ Error al obtener stock bajo:', error)
    res
      .status(500)
      .json({ message: 'Error al consultar productos con poco stock' })
  }
}

// Obtener productos por categoría
const getStockPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.query

    if (!categoria || categoria.trim() === '') {
      return res
        .status(400)
        .json({ message: 'Falta el parámetro de categoría' })
    }

    const productos = await Product.find(
      { categoria: categoria.trim() },
      'nombre categoria unidad stock_actual stock_minimo'
    )

    res.json(productos)
  } catch (error) {
    console.error('❌ Error al obtener por categoría:', error)
    res.status(500).json({ message: 'Error al consultar por categoría' })
  }
}

module.exports = {
  getAllStock,
  getStockById,
  getStockBajo,
  getStockPorCategoria
}
