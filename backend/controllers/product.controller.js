const Product = require('../models/Product')
const Movement = require('../models/Movement') // ✅ importamos Movement

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const productos = await Product.find()
    res.json(productos)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' })
  }
}

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id)
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.json(producto)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' })
  }
}

// Crear nuevo producto
const createProduct = async (req, res) => {
  try {
    const {
      nombre,
      categoria,
      unidad,
      stock_actual,
      stock_minimo,
      precio_compra,
      precio_venta
    } = req.body

    if (!nombre || !categoria || !unidad) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    const nuevoProducto = new Product({
      nombre,
      categoria,
      unidad,
      stock_actual: stock_actual || 0,
      stock_minimo: stock_minimo || 0,
      precio_compra,
      precio_venta
    })

    await nuevoProducto.save()

    // ✅ Crear movimiento de entrada automático
    if (nuevoProducto.stock_actual > 0) {
      const nuevoMovimiento = new Movement({
        tipo: 'entrada',
        cantidad: nuevoProducto.stock_actual,
        producto: nuevoProducto._id,
        observaciones: 'Entrada automática al crear producto',
        usuario: req.user?.id || null
      })

      await nuevoMovimiento.save()
    }

    res.status(201).json(nuevoProducto)
  } catch (error) {
    console.error('Error al crear producto:', error)
    res.status(500).json({ message: 'Error al crear producto' })
  }
}

// Actualizar producto por ID
const updateProduct = async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.json(producto)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto' })
  }
}

// Eliminar producto por ID
const deleteProduct = async (req, res) => {
  try {
    const producto = await Product.findByIdAndDelete(req.params.id)
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.json({ message: 'Producto eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' })
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
