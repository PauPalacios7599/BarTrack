const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

// 📌 Cargar variables de entorno
dotenv.config()

// 📌 Conectar a MongoDB
connectDB()

// 📌 Inicializar app
const app = express()

// 📌 Middlewares
app.use(cors())
app.use(express.json())

// 📌 Importar rutas
const productRoutes = require('./routes/product.routes')
const movementRoutes = require('./routes/movement.routes')
const authRoutes = require('./routes/auth.routes')
const recountRoutes = require('./routes/recount.routes')
const stockRoutes = require('./routes/stock.routes')

// 📌 Usar rutas
app.use('/api/products', productRoutes)
app.use('/api/movements', movementRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/recounts', recountRoutes)
app.use('/api/stock', stockRoutes)

// 📌 Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('🎉 API BarTrack funcionando')
})

// 📌 Levantar servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`)
})
