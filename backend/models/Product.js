const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    unidad: { type: String, required: true },
    stock_actual: { type: Number, default: 0 },
    stock_minimo: { type: Number, default: 0 },
    precio_compra: { type: Number },
    precio_venta: { type: Number }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
