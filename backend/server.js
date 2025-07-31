const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

// 📌 Importar rutas
const productRoutes = require('./routes/product.routes')

// Cargar variables de entorno
dotenv.config()

// Conectar a MongoDB
connectDB()

// Inicializar la app de Express
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/products', productRoutes)

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🎉 API BarTrack funcionando')
})

// Levantar servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`)
})

const movementRoutes = require('./routes/movement.routes')
app.use('/api/movements', movementRoutes)

const authRoutes = require('./routes/auth.routes')
app.use('/api/auth', authRoutes)

const recountRoutes = require('./routes/recount.routes')
app.use('/api/recounts', recountRoutes)

const stockRoutes = require('./routes/stock.routes')
app.use('/api/stock', stockRoutes)
