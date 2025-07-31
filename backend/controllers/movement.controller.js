const Movement = require('../models/Movement')
const Product = require('../models/Product')

// Registrar un movimiento de stock
const createMovement = async (req, res) => {
  try {
    const { tipo, cantidad, producto, observaciones } = req.body

    if (!tipo || !cantidad || !producto) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' })
    }

    const productoEncontrado = await Product.findById(producto)
    if (!productoEncontrado) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    if (tipo === 'entrada') {
      productoEncontrado.stock_actual += cantidad
    } else if (tipo === 'salida') {
      if (productoEncontrado.stock_actual < cantidad) {
        return res.status(400).json({ message: 'Stock insuficiente' })
      }
      productoEncontrado.stock_actual -= cantidad
    }

    await productoEncontrado.save()

    const nuevoMovimiento = new Movement({
      tipo,
      cantidad,
      producto,
      observaciones,
      usuario: req.user?.id || null
    })

    await nuevoMovimiento.save()
    res.status(201).json(nuevoMovimiento)
  } catch (error) {
    console.error('Error al registrar movimiento:', error)
    res.status(500).json({ message: 'Error al registrar movimiento' })
  }
}

// Obtener todos los movimientos con filtros opcionales
const getAllMovements = async (req, res) => {
  try {
    const { producto, tipo, desde, hasta } = req.query
    const filtro = {}

    if (producto) filtro.producto = producto
    if (tipo) filtro.tipo = tipo
    if (desde || hasta) {
      filtro.createdAt = {}
      if (desde) filtro.createdAt.$gte = new Date(desde)
      if (hasta) filtro.createdAt.$lte = new Date(hasta)
    }

    const movimientos = await Movement.find(filtro)
      .populate('producto', 'nombre categoria unidad')
      .populate('usuario', 'nombre email')
      .sort({ createdAt: -1 })

    res.json(movimientos)
  } catch (error) {
    console.error('Error al obtener movimientos:', error)
    res.status(500).json({ message: 'Error al obtener movimientos' })
  }
}

// Obtener productos con más salidas
const getTopSalidas = async (req, res) => {
  try {
    const topSalidas = await Movement.aggregate([
      { $match: { tipo: 'salida' } },
      {
        $group: {
          _id: '$producto',
          totalSalidas: { $sum: '$cantidad' }
        }
      },
      { $sort: { totalSalidas: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'producto'
        }
      },
      { $unwind: '$producto' },
      {
        $project: {
          nombre: '$producto.nombre',
          totalSalidas: 1
        }
      }
    ])

    res.json(topSalidas)
  } catch (error) {
    console.error('❌ Error al obtener productos más vendidos:', error)
    res.status(500).json({ message: 'Error al obtener productos más vendidos' })
  }
}

module.exports = {
  createMovement,
  getAllMovements,
  getTopSalidas
}
