const mongoose = require('mongoose')

const movementSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      enum: ['entrada', 'salida'],
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    observaciones: {
      type: String,
      default: ''
    }
  },
  { timestamps: true } 
)

module.exports = mongoose.model('Movement', movementSchema)
