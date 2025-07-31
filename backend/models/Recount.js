const mongoose = require('mongoose')

const recountSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    stock_fisico: {
      type: Number,
      required: true
    },
    // stock_fisico - stock_actual
    diferencia: {
      type: Number,
      required: true
    },
    alerta: {
      type: Boolean,
      default: false
    },
    observaciones: {
      type: String
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recount', recountSchema)
