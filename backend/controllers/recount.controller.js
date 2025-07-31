const Recount = require('../models/Recount')
const Product = require('../models/Product')

// Crear recuento físico
const createRecount = async (req, res) => {
  try {
    console.log('🔍 Entrando a createRecount')
    console.log('📦 BODY recibido:', req.body)

    const { producto, stock_fisico, observaciones } = req.body

    const prod = await Product.findById(producto)
    if (!prod) {
      console.log('❌ Producto no encontrado:', producto)
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    const diferencia = stock_fisico - prod.stock_actual
    const alerta = diferencia < 0

    const nuevoRecuento = new Recount({
      producto,
      stock_fisico,
      diferencia,
      alerta,
      observaciones,
      usuario: req.user?.id || null
    })

    await nuevoRecuento.save()

    res.status(201).json({
      message: alerta
        ? '⚠️ Alerta: falta stock respecto al sistema'
        : '✅ Recuento registrado sin incidencias',
      recuento: nuevoRecuento
    })
  } catch (error) {
    console.error('❌ Error al crear recuento:', error)
    res.status(500).json({ message: 'Error al crear recuento físico' })
  }
}

// Obtener todos los recuentos
const getAllRecounts = async (req, res) => {
  try {
    const recuentos = await Recount.find()
      .populate('producto', 'nombre categoria unidad')
      .sort({ createdAt: -1 })

    res.json(recuentos)
  } catch (error) {
    console.error('❌ Error al obtener recuentos:', error)
    res.status(500).json({ message: 'Error al obtener recuentos físicos' })
  }
}

module.exports = {
  createRecount,
  getAllRecounts
}
